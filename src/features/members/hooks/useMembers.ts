// // src/features/members/hooks/useMembers.ts
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   Member,
//   InviteMemberPayload, // ✅ REQUIRED
//   fetchMembers,
//   inviteMember,
//   updateMemberRole,
//   deleteMember,
//   MemberRole,
// } from "../membersApi";




// export function useMembersQuery() {
//   return useQuery<Member[]>({
//     queryKey: ["members"],
//     queryFn: fetchMembers,
//   });
// }

// export function useInviteMemberMutation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: InviteMemberPayload) => inviteMember(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//     },
//   });
// }

// export function useUpdateMemberRoleMutation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (vars: { memberId: string; role: MemberRole }) =>
//       updateMemberRole(vars.memberId, vars.role),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//     },
//   });
// }

// export function useDeleteMemberMutation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (memberId: string) => deleteMember(memberId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//     },
//   });
// }

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { InviteMemberPayload, MemberRole, Member} from "../membersApi";

import {
  fetchMembers,
  inviteMember,
  updateMemberRole,
  deleteMember,
} from "../membersApi";


export function useMembersQuery() {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
}

export function useInviteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: InviteMemberPayload) => inviteMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useUpdateMemberRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { memberId: string; role: MemberRole }) =>
      updateMemberRole(vars.memberId, vars.role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => deleteMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

