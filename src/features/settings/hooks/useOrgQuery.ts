import { useQuery } from "@tanstack/react-query";
import { fetchOrgSettings } from "../api/orgApi";

export function useOrgQuery() {
  return useQuery({
    queryKey: ["settings", "org"],
    queryFn: fetchOrgSettings,
    staleTime: 60_000, // 1 min
  });
}
