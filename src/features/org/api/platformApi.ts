import { api } from "../../../shared/api/axiosClient";
import type { PlatformOrg, OrgStatus } from "../types";

export async function fetchPlatformOrgs(): Promise<PlatformOrg[]> {
  const { data } = await api.get<{ data: PlatformOrg[] }>(
    "/platform/orgs"
  );

  return data.data;
}

export async function fetchPlatformOrgDetail(
  id: string
): Promise<PlatformOrg> {
  const { data } = await api.get<{ data: PlatformOrg }>(
    `/platform/orgs/${id}`
  );

  return data.data;
}

export async function updatePlatformOrgStatus(
  orgId: string,
  status: OrgStatus
): Promise<void> {
  await api.patch(`/platform/orgs/${orgId}/status`, {
    status,
  });
}