export type OrgStatus = "ACTIVE" | "DISABLED";

export interface PlatformOrg {
  id: string;
  name: string;
  slug: string;
  status: OrgStatus;
  messageCount: number;
  createdAt: string;
}