// src/api/chatApi.ts
// Mock chat API for dev

export type ChatSession = {
  id: string;
  customer: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  status: "open" | "closed";
};

export type ChatMessage = {
  id: string;
  sessionId: string;
  sender: "customer" | "agent" | "system";
  text: string;
  createdAt: string;
};

const now = Date.now();

const sessions: ChatSession[] = [
  {
    id: "s1",
    customer: "Aman Sharma",
    lastMessage: "Thanks — that worked!",
    unreadCount: 0,
    updatedAt: new Date(now - 1000 * 60 * 60).toISOString(),
    status: "open",
  },
  {
    id: "s2",
    customer: "Priya",
    lastMessage: "Where is my refund?",
    unreadCount: 2,
    updatedAt: new Date(now - 1000 * 60 * 30).toISOString(),
    status: "open",
  },
  {
    id: "s3",
    customer: "John",
    lastMessage: "I need help with login",
    unreadCount: 1,
    updatedAt: new Date(now - 1000 * 60 * 5).toISOString(),
    status: "open",
  },
];

const messages: ChatMessage[] = [
  // s1
  { id: "m1", sessionId: "s1", sender: "customer", text: "It worked, thanks!", createdAt: new Date(now - 1000 * 60 * 60).toISOString() },
  { id: "m2", sessionId: "s1", sender: "agent", text: "Glad to hear — closing this.", createdAt: new Date(now - 1000 * 60 * 60 + 60000).toISOString() },

  // s2
  { id: "m3", sessionId: "s2", sender: "customer", text: "Where is my refund? I waited 5 days.", createdAt: new Date(now - 1000 * 60 * 30).toISOString() },
  { id: "m4", sessionId: "s2", sender: "agent", text: "I'll check with billing and update you.", createdAt: new Date(now - 1000 * 60 * 29).toISOString() },

  // s3
  { id: "m5", sessionId: "s3", sender: "customer", text: "I can't login with OTP", createdAt: new Date(now - 1000 * 60 * 5).toISOString() },
];

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const fetchChatSessions = async (query?: string): Promise<ChatSession[]> => {
  await wait(200);
  if (!query) return sessions.slice().sort((a,b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  const q = query.toLowerCase();
  return sessions.filter(s => s.customer.toLowerCase().includes(q) || s.lastMessage.toLowerCase().includes(q));
};

export const fetchMessages = async (sessionId: string): Promise<ChatMessage[]> => {
  await wait(200);
  return messages.filter(m => m.sessionId === sessionId).sort((a,b) => +new Date(a.createdAt) - +new Date(b.createdAt));
};

export const sendMessage = async (sessionId: string, text: string): Promise<ChatMessage> => {
  await wait(150);
  const msg: ChatMessage = {
    id: Math.random().toString(36).slice(2,9),
    sessionId,
    sender: "agent",
    text,
    createdAt: new Date().toISOString(),
  };
  messages.push(msg);
  // update session lastMessage and timestamp
  const s = sessions.find(x => x.id === sessionId);
  if (s) {
    s.lastMessage = text;
    s.updatedAt = new Date().toISOString();
    s.unreadCount = Math.max(0, s.unreadCount - 1);
  }
  return msg;
};

export const openNewSession = async (customer: string, initialMessage?: string): Promise<ChatSession> => {
  await wait(200);
  const id = "s" + Math.floor(Math.random() * 10000);
  const s: ChatSession = {
    id,
    customer,
    lastMessage: initialMessage ?? "",
    unreadCount: 0,
    updatedAt: new Date().toISOString(),
    status: "open",
  };
  sessions.unshift(s);
  if (initialMessage) {
    messages.push({ id: Math.random().toString(), sessionId: id, sender: "agent", text: initialMessage, createdAt: new Date().toISOString() });
  }
  return s;
};
