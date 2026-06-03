// // src/api/analyticsApi.ts
// import api from "./axiosClient";

// export type OverviewStats = {
//   totalTickets: number;
//   openTickets: number;
//   aiResolved: number;
//   activeChats: number;
//   knowledgeDocs: number;
//   avgResponseTimeSeconds: number;
// };

// export const fetchOverview = async (): Promise<OverviewStats> => {
//   // Replace with your real endpoint
//   const res = await api.get("/analytics/overview");
//   return res.data.data as OverviewStats;
// };

// export type TicketTrendPoint = { date: string; total: number; open: number };

// export const fetchTicketTrend = async (): Promise<TicketTrendPoint[]> => {
//   const res = await api.get("/analytics/ticket-trend");
//   return res.data.data as TicketTrendPoint[];
// };

// export const fetchResolutionBreakdown = async (): Promise<{ name: string; value: number }[]> => {
//   const res = await api.get("/analytics/resolution-breakdown");
//   return res.data.data as { name: string; value: number }[];
// };

// export type RecentActivityItem = {
//   id: string;
//   type: "ticket" | "chat" | "doc";
//   title: string;
//   status?: string;
//   user?: string;
//   createdAt: string;
// };
// export const fetchRecentActivity = async (): Promise<RecentActivityItem[]> => {
//   const res = await api.get("/analytics/recent-activity");
//   return res.data.data as RecentActivityItem[];
// };


// src/api/analyticsApi.ts
// MOCK MODE — no backend required

// ---------------------------
// Types
// ---------------------------

export type OverviewStats = {
  totalTickets: number;
  openTickets: number;
  aiResolved: number;
  activeChats: number;
  knowledgeDocs: number;
  avgResponseTimeSeconds: number;
};

export type TicketTrendPoint = {
  date: string;
  total: number;
  open: number;
};

export type RecentActivityItem = {
  id: string;
  type: "ticket" | "chat" | "doc";
  title: string;
  status?: string;
  user?: string;
  createdAt: string;
};

// ---------------------------
// MOCK DATA
// ---------------------------

// 1) Overview stats
const mockOverview: OverviewStats = {
  totalTickets: 1245,
  openTickets: 87,
  aiResolved: 512,
  activeChats: 14,
  knowledgeDocs: 236,
  avgResponseTimeSeconds: 340,
};

// 2) Ticket trend (30 days)
const mockTrend: TicketTrendPoint[] = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10),
  total: Math.round(800 + Math.sin(i / 4) * 120 + i * 2),
  open: Math.round(30 + Math.cos(i / 3) * 20 + i / 5),
}));

// 3) AI vs Human resolution
const mockBreakdown = [
  { name: "AI Resolved", value: 512 },
  { name: "Human Resolved", value: 700 },
];

// 4) Recent activity
const mockActivity: RecentActivityItem[] = [
  {
    id: "t1",
    type: "ticket",
    title: "Payment failure for order #123",
    user: "Aman",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "c1",
    type: "chat",
    title: "Chat session with John",
    user: "John",
    status: "closed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "d1",
    type: "doc",
    title: "New refund policy uploaded",
    user: "Admin",
    status: "-",
    createdAt: new Date().toISOString(),
  },
];

// ---------------------------
// UTILITY: mock network delay
// ---------------------------
const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------
// MOCK API FUNCTIONS
// ---------------------------

export const fetchOverview = async (): Promise<OverviewStats> => {
  await wait(300); // simulated backend delay
  return mockOverview;
};

export const fetchTicketTrend = async (): Promise<TicketTrendPoint[]> => {
  await wait(300);
  return mockTrend;
};

export const fetchResolutionBreakdown = async (): Promise<
  { name: string; value: number }[]
> => {
  await wait(300);
  return mockBreakdown;
};

export const fetchRecentActivity = async (): Promise<RecentActivityItem[]> => {
  await wait(300);
  return mockActivity;
};
