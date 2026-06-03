// src/api/membersApi.ts

import { api } from "../../shared/api/axiosClient";


export type MemberRole = "OWNER" | "ADMIN" | "AGENT" | "CUSTOMER";
export type MemberStatus = "ACTIVE" | "INVITED" | "DISABLED";

export interface Member {
  id: string;
  name: string | null;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  createdAt: string;
}

export interface InviteMemberPayload {
  email: string;
  name?: string;
}

export async function fetchMembers(): Promise<Member[]> {
  const res = await api.get("/org/members");
  // Expected: { success: true, members: [...] }
  console.log("Printing data from api response", res);
  return res.data.agents;
}

export async function inviteMember(payload: InviteMemberPayload): Promise<Member> {
  const res = await api.post("/org/members/invite", payload);
  // Expected: { success: true, member: {...} }
  return res.data.member;
}

export async function updateMemberRole(
  memberId: string,
  role: MemberRole
): Promise<Member> {
  const res = await api.patch(`/org/members/${memberId}`, { role });
  return res.data.member;
}

export async function deleteMember(memberId: string): Promise<void> {
  await api.delete(`/org/members/${memberId}`);
}
