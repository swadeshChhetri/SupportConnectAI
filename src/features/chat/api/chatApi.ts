// chatApi.ts
import { api } from "../../../shared/api/axiosClient";

export type ChatSession = {
  id: string;
  customer: string;
  title?: string | null;
  lastMessage?: string | null;
  unreadCount: number;
  updatedAt: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  sessionId: string;
  sender: "user" | "agent" | "ai";
  text: string;
  createdAt: string;
};

// LIST SESSIONS (GET /chat/sessions)
export async function fetchChatSessions(): Promise<ChatSession[]> {
  const res = await api.get("/chat/sessions");
  return res.data.sessions as ChatSession[];
}

// GET session details (includes messages) — fallback if backend returns session with messages
export async function fetchSessionDetails(sessionId: string): Promise<{ session: ChatSession; messages?: ChatMessage[] }> {
  const res = await api.get(`/chat/sessions/${sessionId}`);
  return res.data.session;
}

// MESSAGES (GET /chat/sessions/:id/messages) — if your API exposes a messages endpoint
export async function fetchMessages(sessionId: string): Promise<ChatMessage[]> {
  const res = await api.get(`/chat/sessions/${sessionId}/messages`);
  return res.data.data as ChatMessage[];
}

// SEND MESSAGE (POST /chat) — according to backend controller you posted, this was POST /chat with body { message, sessionId }
export async function sendMessage(sessionId: string, text: string): Promise<ChatMessage> {
  const res = await api.post("/chat", { message: text, sessionId });
  // your backend returned { success: true, ...result } — adjust if needed
  // assume it returns { success: true, message: ChatMessage }
  // handle multiple shapes conservatively:
  if (res.data.message) return res.data.message as ChatMessage;
  if (res.data.data) return res.data.data as ChatMessage;
  // fallback: try to derive message from result
  return res.data as ChatMessage;
}
