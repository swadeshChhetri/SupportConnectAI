// src/features/members/components/MembersTable.tsx
import React from "react";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
// import { Member, MemberRole } from "../../../api/membersApi";


interface MembersTableProps {
  members: Member[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onChangeRole: (memberId: string, role: MemberRole) => void;
  onDelete: (memberId: string) => void;
}

const roleLabel: Record<MemberRole, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  AGENT: "Agent",
  CUSTOMER: "Customer",
};

export const MembersTable: React.FC<MembersTableProps> = ({
  members,
  isLoading,
  isError,
  onRetry,
  onChangeRole,
  onDelete,
}) => {
  const currentUser = useAuthStore((s) => s.user);
  const currentRole = currentUser?.role as MemberRole | undefined;
  const canManage =
    currentRole === "OWNER" || currentRole === "ADMIN";

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading members...</div>;
  }

  if (isError) {
    return (
      <div className="text-sm text-red-500 flex items-center gap-2">
        Failed to load members.
        <button
          onClick={onRetry}
          className="text-xs underline underline-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="border rounded-lg p-4 text-sm text-gray-500">
        No team members yet. Invite your first teammate to get started.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              Email
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              Role
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              Status
            </th>
            <th className="px-4 py-2 text-right font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const isSelf = member.id === currentUser?.id;
            const isOwner = member.role === "OWNER";

            return (
              <tr
                key={member.id}
                className="border-t last:border-b hover:bg-gray-50/60"
              >
                <td className="px-4 py-2">
                  <div className="font-medium text-gray-900">
                    {member.name || "—"}
                  </div>
                </td>
                <td className="px-4 py-2 text-gray-700">{member.email}</td>
                <td className="px-4 py-2">
                  {canManage && !isOwner && !isSelf ? (
                    <select
                      value={member.role}
                      onChange={(e) =>
                        onChangeRole(
                          member.id,
                          e.target.value as MemberRole
                        )
                      }
                      className="text-xs border rounded px-2 py-1 bg-white"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="AGENT">Agent</option>
                      <option value="CUSTOMER">Customer</option>
                    </select>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs border bg-gray-50">
                      {roleLabel[member.role]}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={
                      "inline-flex items-center px-2 py-1 rounded-full text-xs " +
                      (member.status === "ACTIVE"
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : member.status === "INVITED"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-gray-50 text-gray-600 border border-gray-100")
                    }
                  >
                    {member.status === "ACTIVE"
                      ? "Active"
                      : member.status === "INVITED"
                      ? "Invited"
                      : "Disabled"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  {canManage && !isOwner && !isSelf && (
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Remove ${member.email} from this organization?`
                          )
                        ) {
                          onDelete(member.id);
                        }
                      }}
                      className="text-xs text-red-600 hover:text-red-700 underline underline-offset-2"
                    >
                      Remove
                    </button>
                  )}
                  {!canManage && (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
