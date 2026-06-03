import { useEffect, useRef, useState } from "react";
import {
  fetchWidgetHistory,
  uploadWidgetFile,
} from "../api/widgetApi";
import {
  connectWidgetSocket,
  sendWidgetSocketMessage,
  onWidgetMessage,
  onWidgetAck,
  disconnectWidgetSocket,
} from "../socket/widgetSocket";
import type { WidgetMessage } from "../types/widget";
import { useWidgetAuth } from "../context/WidgetAuthContext";
import { generateId } from "../../utils/generateId";


// Helper function to normalize any message to WidgetMessage format
function normalizeMessage(message: any): WidgetMessage {
  if (message.sender && message.type) {
    return message as WidgetMessage;
  }

  return {
    id: message.id,
    sessionId: message.sessionId,
    text: message.text || message.content || "",
    sender:
      message.senderType === "CUSTOMER"
        ? "user"
        : message.senderType === "AI"
          ? "ai"
          : message.senderType === "AGENT"
            ? "agent"
            : message.sender || "ai",
    type: message.type || "text",
    createdAt: message.createdAt
      ? typeof message.createdAt === "string"
        ? message.createdAt
        : message.createdAt.toISOString()
      : new Date().toISOString(),
  };
}

export function useWidgetChat(
  sessionId: string | null,
  visitorId: string
) {
  const { widgetApiKey } = useWidgetAuth();
  const [messages, setMessages] = useState<WidgetMessage[]>([]);

  const pendingAcks = useRef<
    Map<string, { resolve: () => void; reject: () => void }>
  >(new Map());

  /* -------------------- */
  /* Load History         */
  /* -------------------- */
  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;

    (async () => {
      const history = await fetchWidgetHistory(
        sessionId,
        widgetApiKey
      );
      if (!cancelled) {
        const normalizedHistory = history.map(normalizeMessage);
        setMessages(normalizedHistory);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId, widgetApiKey]);

  /* -------------------- */
  /* Socket Connect       */
  /* -------------------- */
  useEffect(() => {
    if (!sessionId) return;

    disconnectWidgetSocket();

    connectWidgetSocket({
      sessionId,
      visitorId,
      widgetApiKey,
    });

    onWidgetMessage((msg: any) => {
      const normalizedMsg = normalizeMessage(msg);

      setMessages((prev) => {
        if (prev.some((m) => m.id === normalizedMsg.id)) {
          return prev;
        }

        const tempIndex = prev.findIndex(
          (m) =>
            m.id.startsWith("temp-") &&
            m.sender === normalizedMsg.sender &&
            m.text === normalizedMsg.text
        );

        if (tempIndex !== -1) {
          const next = [...prev];
          next[tempIndex] = normalizedMsg;
          return next;
        }

        return [...prev, normalizedMsg];
      });
    });

    onWidgetAck(({ tempId }) => {
      const entry = pendingAcks.current.get(tempId);
      if (!entry) return;

      entry.resolve();
      pendingAcks.current.delete(tempId);

      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    });

    return () => {
      disconnectWidgetSocket();
      pendingAcks.current.clear();
    };
  }, [sessionId, visitorId, widgetApiKey]);

  /* -------------------- */
  /* Send TEXT            */
  /* -------------------- */
  function sendTextMessage(text: string): Promise<void> {
    if (!sessionId || !text.trim()) {
      return Promise.reject(new Error("Invalid message"));
    }

    const tempId = "temp-" + generateId();

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        sessionId,
        sender: "user",
        type: "text",
        text,
        createdAt: new Date().toISOString(),
      },
    ]);

    return new Promise((resolve, reject) => {
      pendingAcks.current.set(tempId, { resolve, reject });

      sendWidgetSocketMessage({
        sessionId,
        text,
        tempId,
      });

      setTimeout(() => {
        if (!pendingAcks.current.has(tempId)) return;

        pendingAcks.current.delete(tempId);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId
              ? { ...m, type: "error" as const, errorText: "Failed to send" }
              : m
          )
        );

        reject(new Error("Message ACK timeout"));
      }, 5000);
    });
  }

  /* -------------------- */
  /* Send FILE            */
  /* -------------------- */
  async function sendFile(file: File) {
    if (!sessionId) return;

    const tempId = "temp-" + generateId();

    const previewUrl = URL.createObjectURL(file);

    const tempMessage: WidgetMessage = {
      id: tempId,
      sessionId,
      sender: "user",
      type: "file",
      text: "",
      fileName: file.name,
      fileUrl: previewUrl,
      createdAt: new Date().toISOString(),
    };

    // optimistic UI
    setMessages((prev) => [...prev, tempMessage]);

    try {
      await uploadWidgetFile(sessionId, file, widgetApiKey);
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? { ...m, type: "error" as const, errorText: "Upload failed" }
            : m
        )
      );
    } finally {
      URL.revokeObjectURL(previewUrl);
    }
  }

  return {
    messages,
    sendTextMessage,
    sendFile,
  };
}
