import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import type { ChatMessage } from "../api/chatApi";

type Callbacks = {
  onNewMessage?: () => void;
  onUnread?: () => void;
  onTakenOver?: () => void;
};

export function useAdminChatSocket(
  sessionId: string | null,
  callbacks: Callbacks = {}
) {
  const user = useAuthStore((s) => s.user);
  const org = useAuthStore((s) => s.org);

  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingSessions, setTypingSessions] = useState<Record<string, boolean>>(
    {}
  );
  const [presence, setPresence] = useState({
    onlineAgentIds: [] as string[],
    count: 0,
  });

  const [connected, setConnected] = useState(false);

  /* ==================================================
     1️⃣ CREATE SOCKET ONCE (per org + user)
  ================================================== */
  useEffect(() => {
    if (!org?.id || !user?.id) return;

    const socket = io(
      (import.meta.env.VITE_API_BASE_URL ?? "") + "/admin-chat",
      {
        auth: {
          orgId: org.id,
          userId: user.id,
        },
        transports: ["websocket"],
      }
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    // /* ---------- HISTORY (if backend sends it) ---------- */
    socket.on("chat:history", (history) => {
      setMessages((prev) => {
        if (prev.length > 0) return prev; // do not override
        return history ?? [];
      });
    });

    /* ---------- RECEIVE MESSAGE ---------- */
    socket.on("chat:receive", (msg: ChatMessage) => {
      setMessages((prev) => {
        // prevent duplicates
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });

      callbacks.onNewMessage?.();
    });

    /* ---------- TYPING ---------- */
    socket.on("typing", ({ sessionId }: { sessionId: string }) => {
      setTypingSessions((prev) => ({
        ...prev,
        [sessionId]: true,
      }));

      setTimeout(() => {
        setTypingSessions((prev) => ({
          ...prev,
          [sessionId]: false,
        }));
      }, 2000);
    });

    socket.on("session:unread", () => callbacks.onUnread?.());
    socket.on("session:taken", () => callbacks.onTakenOver?.());
    socket.on("presence:update", (p: any) => {
      setPresence({
        onlineAgentIds: p?.onlineAgentIds ?? [],
        count: p?.count ?? 0,
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [org?.id, user?.id]);

  /* ==================================================
     2️⃣ CLEAR MESSAGES WHEN SESSION CHANGES
  ================================================== */
  useEffect(() => {
    setMessages([]);
  }, [sessionId]);

  /* ==================================================
     3️⃣ JOIN SESSION WHEN SESSION CHANGES
  ================================================== */
  useEffect(() => {
    if (!socketRef.current || !sessionId) return;

    socketRef.current.emit("join-session", sessionId);
  }, [sessionId]);

  /* ==================================================
     ACTIONS
  ================================================== */

  const sendMessage = (text: string) => {
    if (!socketRef.current || !sessionId || !text.trim()) return;

    socketRef.current.emit("chat:send", {
      sessionId,
      text,
    });
  };

  const sendTyping = () => {
    if (!socketRef.current || !sessionId) return;
    socketRef.current.emit("typing", { sessionId });
  };

  const takeOver = () => {
    if (!socketRef.current || !sessionId) return;
    socketRef.current.emit("take:over", { sessionId });
  };

  const markRead = () => {
    if (!socketRef.current || !sessionId) return;
    socketRef.current.emit("mark:read", { sessionId });
  };

  return {
    messages,
    connected,
    typingSessions,
    presence,
    sendMessage,
    sendTyping,
    takeOver,
    markRead,
  };
}