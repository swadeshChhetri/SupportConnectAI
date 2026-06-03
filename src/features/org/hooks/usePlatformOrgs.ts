import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlatformOrgs,
  fetchPlatformOrgDetail,
  updatePlatformOrgStatus,
} from "../api/platformApi";
import type { OrgStatus } from "../types";

export function usePlatformOrgs() {
  return useQuery({
    queryKey: ["platform-orgs"],
    queryFn: fetchPlatformOrgs,
  });
}

export function usePlatformOrgDetail(id: string) {
  return useQuery({
    queryKey: ["platform-org", id],
    queryFn: () => fetchPlatformOrgDetail(id),
    enabled: !!id,
  });
}

export function useUpdatePlatformOrgStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orgId,
      status,
    }: {
      orgId: string;
      status: OrgStatus;
    }) => updatePlatformOrgStatus(orgId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-orgs"] });
    },
  });
}