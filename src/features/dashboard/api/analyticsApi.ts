import { api } from "../../../shared/api/axiosClient";

// -------------------------
// Types
// -------------------------
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
  count: number;
};

export type ResolutionBreakdownItem = {
  name: string;
  value: number;
};

export type RecentActivityItem = {
  id: string;
  type: string;
  title: string;
  user?: string;
  status?: string;
  createdAt: string;
};

// -------------------------
// API calls
// -------------------------
export async function fetchOverview(): Promise<OverviewStats> {
  const res = await api.get("/analytics/overview");
  return res.data.data;
}

export async function fetchTicketTrend(): Promise<TicketTrendPoint[]> {
  const res = await api.get("/analytics/tickets/trend");
  return res.data.data;
}

export async function fetchResolutionBreakdown(): Promise<ResolutionBreakdownItem[]> {
  const res = await api.get("/analytics/resolution");
  return res.data.data;
}

export async function fetchRecentActivity(): Promise<RecentActivityItem[]> {
  const res = await api.get("/analytics/activity");
  return res.data.data;
}
