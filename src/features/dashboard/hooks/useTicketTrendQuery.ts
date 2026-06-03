import { useQuery } from "@tanstack/react-query";
import { fetchTicketTrend } from "../api/analyticsApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useTicketTrendQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["tickets-trend", orgId],
    queryFn: fetchTicketTrend,
    staleTime: 120_000,
  });
}
