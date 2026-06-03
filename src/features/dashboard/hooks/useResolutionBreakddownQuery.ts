import { useQuery } from "@tanstack/react-query";
import { fetchResolutionBreakdown } from "../api/analyticsApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useResolutionBreakdownQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["resolution-breakdown", orgId],
    queryFn: fetchResolutionBreakdown,
    staleTime: 120_000,
  });
}
