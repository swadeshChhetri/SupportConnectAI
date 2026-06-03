import { useQuery } from "@tanstack/react-query";
// import { api } from "../../../shared/api/axiosClient";

import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { api } from "../../../shared/api/axiosClient";

export type ChatInsightsResponse = {
  avgConfidence: number;
  escalationRate: number;
  aiMessages: number;
  humanMessages: number;
  avgHumanDelay: number;
  topEscalationReasons: { reason: string; count: number }[];
  confidenceTrend: { date: string; value: number }[];
};

export function useChatInsightsQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["analytics", "chatInsights", orgId],
    queryFn: async () => {
      const res = await api.get<{ data: ChatInsightsResponse }>(
        "/analytics/chat-insights"
      );
      return res.data.data;
    },
    enabled: !!orgId,
    staleTime: 60_000, // 1 min — analytics isn't real-time
  });
}
