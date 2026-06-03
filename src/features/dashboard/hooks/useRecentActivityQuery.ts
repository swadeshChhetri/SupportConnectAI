import { useQuery } from "@tanstack/react-query";
import { fetchRecentActivity } from "../api/analyticsApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useRecentActivityQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["recent-activity", orgId],
    queryFn: fetchRecentActivity,
    staleTime: 30_000,
  });
}
