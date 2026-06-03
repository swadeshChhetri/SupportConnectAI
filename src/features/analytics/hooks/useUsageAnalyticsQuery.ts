import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api/axiosClient";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export type UsageAnalyticsResponse = {
  estimatedSavings: number;
  csatScore: number;
  totalMessages: number;
  totalTickets: number;

  ticketTrend: { month: string; value: number }[];
  messageTrend: { month: string; value: number }[];
  aiUsageTrend: { month: string; value: number }[];
  documentStatusTrend: {
    month: string;
    ready: number;
    processing: number;
    failed: number;
  }[];
};

export function useUsageAnalyticsQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["analytics", "usage", orgId],
    queryFn: async () => {
      const res = await api.get<{ data: UsageAnalyticsResponse }>(
        "/analytics/usage"
      );
      return res.data.data;
    },
    enabled: !!orgId,
    staleTime: 120_000, // cache 2 min
  });
}
