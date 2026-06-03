import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "../api/analyticsApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useOverviewQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["analytics-overview", orgId],
    queryFn: fetchOverview,
    staleTime: 60_000, // 1 min caching
  });
}
