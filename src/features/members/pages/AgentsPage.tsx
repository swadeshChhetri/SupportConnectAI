import { useState } from "react";
import { UserPlus, User, Mail, Shield } from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import { InviteMemberDialog } from "../components/InviteMemberDialog";
import { useInviteMemberMutation, useMembersQuery } from "../hooks/useMembers";

export default function AgentsPage() {
  const { data: members, isLoading } = useMembersQuery();
  const [inviteOpen, setInviteOpen] = useState(false);
  const inviteMutation = useInviteMemberMutation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <p className="font-bold text-sm tracking-widest uppercase">Fetching Agents...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Team Members</h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Manage your support team and permissions</p>
        </div>
        
        <button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Agents Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Member Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Email</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic font-medium">
                    No team members found.
                  </td>
                </tr>
              ) : (
                members?.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 leading-tight mb-0.5">{m.name || "Unnamed Agent"}</p>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.1em]">{m.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-medium">{m.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Badge color={m.status === "ACTIVE" ? "green" : "gray"}>
                        {m.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-500/50" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Edit Role
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <InviteMemberDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        isSubmitting={inviteMutation.isPending}
        onInvite={async (payload) => {
          await inviteMutation.mutateAsync(payload);
        }}
      />
    </div>
  );
}