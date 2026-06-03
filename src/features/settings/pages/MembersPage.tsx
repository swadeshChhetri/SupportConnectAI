// import { useEffect, useState } from "react";
// import {
//   fetchMembers,
//   inviteMember,
//   updateMemberRole,
//   removeMember,
//   type Member,
// } from "../../api/settingsApi";
// import MemberRow from "../../components/ui/MemberRow";

// export default function MembersPage() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState<"ADMIN" | "AGENT">("AGENT");

//   useEffect(() => {
//     load();
//   }, []);

//   async function load() {
//     const data = await fetchMembers();
//     setMembers(data);
//   }

//   async function sendInvite() {
//     if (!email) return;
//     await inviteMember(email, role);
//     setEmail("");
//     load();
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-6">Team Members</h1>

//       {/* Invite */}
//       <div className="bg-white p-4 shadow rounded mb-6">
//         <h2 className="font-medium mb-2">Invite New Member</h2>

//         <div className="flex gap-4 items-end">
//           <input
//             placeholder="user@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 rounded w-64"
//           />

//           <select
//             className="border p-2 rounded"
//             value={role}
//             onChange={(e) => setRole(e.target.value as any)}
//           >
//             <option value="AGENT">Agent</option>
//             <option value="ADMIN">Admin</option>
//           </select>

//           <button
//             onClick={sendInvite}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Invite
//           </button>
//         </div>
//       </div>

//       {/* Members List */}
//       <div className="bg-white p-6 shadow rounded">
//         <table className="w-full text-left text-sm">
//           <thead>
//             <tr className="border-b text-gray-600">
//               <th className="py-2">Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {members.map((m) => (
//               <MemberRow
//                 key={m.id}
//                 member={m}
//                 onRoleChange={async (r) => {
//                   await updateMemberRole(m.id, r);
//                   load();
//                 }}
//                 onRemove={async () => {
//                   await removeMember(m.id);
//                   load();
//                 }}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useMembersQuery } from "../../features/members/hooks/useMembers";
import {
  useInviteMemberMutation,
  useUpdateMemberRoleMutation,
  useDeleteMemberMutation,
} from "../../features/members/hooks/useMembers";
import { InviteMemberDialog } from "../../features/members/components/InviteMemberDialog";
import { MembersTable } from "../../features/members/components/MembersTable";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";
// import { InviteMemberPayload, MemberRole } from "../../api/membersApi";

export default function MembersPage() {
  const [inviteOpen, setInviteOpen] = useState(false);

  const currentUser = useAuthStore((s) => s.user);
  const currentRole = currentUser?.role;

  const canManage =
    currentRole === "OWNER" || currentRole === "ADMIN";

  // Queries
  const {
    data: members,
    isLoading,
    isError,
    refetch,
  } = useMembersQuery();

  // Mutations
  const inviteMutation = useInviteMemberMutation();
  const updateRoleMutation = useUpdateMemberRoleMutation();
  const deleteMutation = useDeleteMemberMutation();

  // Handlers
  const handleInvite = async (payload: InviteMemberPayload) => {
    await inviteMutation.mutateAsync(payload);
  };

  const handleChangeRole = async (memberId: string, role: MemberRole) => {
    await updateRoleMutation.mutateAsync({ memberId, role });
  };

  const handleDelete = async (memberId: string) => {
    await deleteMutation.mutateAsync(memberId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Team Members</h1>
          <p className="text-sm text-gray-500">
            Manage who can access and collaborate in your workspace.
          </p>
        </div>

        {canManage && (
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setInviteOpen(true)}
          >
            Invite Member
          </button>
        )}
      </div>

      {/* Members Table */}
      <MembersTable
        members={members ?? []}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onChangeRole={handleChangeRole}
        onDelete={handleDelete}
      />

      {/* Invite Dialog */}
      <InviteMemberDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInvite}
        isSubmitting={inviteMutation.isLoading}
      />
    </div>
  );
}

