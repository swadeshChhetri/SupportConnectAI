import { io, Socket } from "socket.io-client";
import type { WidgetMessage } from "../types/widget";

let socket: Socket | null = null;
let connectionAttempts = 0;

/* -------------------- */
/* CONNECT              */
/* -------------------- */
export function connectWidgetSocket({
  sessionId,
  visitorId,
  widgetApiKey,
}: {
  sessionId: string;
  visitorId: string;
  widgetApiKey: string;
}) {
  const socketUrl = import.meta.env.VITE_WIDGET_SOCKET_URL;
  const fullUrl = socketUrl + "/widget-chat";

  connectionAttempts++;
  console.log(
    `🔌 [Frontend] Attempt #${connectionAttempts} to connect to:`,
    fullUrl
  );
  console.log("📤 Auth data:", { sessionId, visitorId });

  socket = io(fullUrl, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,

    auth: {
      sessionId,
      visitorId,
      widgetApiKey,
    },
  });

  socket.on("connect", () => {
    console.log("✅ [Frontend] CONNECTED to server!");
    console.log("🔗 Socket ID:", socket?.id);
    console.log("🔗 Namespace:", socket?.nsp);
    console.log("🔗 Connected:", socket?.connected);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ [Frontend] Connection FAILED:", error.message);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      cause: error.cause,
      description: error.description,
    });
  });

  socket.on("disconnect", (reason, description) => {
    console.log("🔴 [Frontend] Disconnected:", reason);
    if (description) console.log("Disconnect description:", description);
  });

  socket.on("error", (error) => {
    console.error("❌ [Frontend] Socket error:", error);
  });

  socket.onAny((eventName, ...args) => {
    console.log(`📢 [Frontend] Received event "${eventName}":`, args);
  });

  setTimeout(() => {
    if (socket?.connected) {
      console.log("🧪 [Frontend] Testing connection...");
      socket.emit("test", { test: "Hello from frontend" });
    }
  }, 1000);
}

/* -------------------- */
/* SEND MESSAGE         */
/* -------------------- */
export function sendWidgetSocketMessage({
  sessionId,
  text,
  tempId,
}: {
  sessionId: string;
  text: string;
  tempId: string;
}) {
  if (!socket) {
    throw new Error("Socket not connected");
  }

  if (!socket.connected) {
    throw new Error("Socket not connected");
  }

  socket.emit("chat:send", {
    sessionId,
    text,
    tempId,
  });
}

/* -------------------- */
/* SEND TYPING          */
/* -------------------- */
export function sendWidgetTyping() {
  if (socket && socket.connected) {
    socket.emit("typing");
  }
}

/* -------------------- */
/* MESSAGE RECEIVE      */
/* -------------------- */
export function onWidgetMessage(
  callback: (msg: WidgetMessage) => void
) {
  if (!socket) return;
  socket.on("chat:receive", callback);
}

/* -------------------- */
/* ACK RECEIVE          */
/* -------------------- */
export function onWidgetAck(
  callback: (data: { tempId: string; id: string }) => void
) {
  if (!socket) return;

  socket.off("message:ack");
  socket.on("message:ack", callback);
}

/* -------------------- */
/* TYPING RECEIVE       */
/* -------------------- */
export function onWidgetTyping(
  callback: (data: { sessionId: string; who: "agent" | "user"; userId?: string }) => void
) {
  if (!socket) return;

  socket.off("typing");
  socket.on("typing", callback);
}

/* -------------------- */
/* DISCONNECT           */
/* -------------------- */
export function disconnectWidgetSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}
