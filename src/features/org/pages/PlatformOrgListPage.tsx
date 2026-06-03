import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  MessageSquare, 
  Activity, 
  Settings, 
  Power, 
  ExternalLink, 
  Search,
  RefreshCcw,
  ShieldCheck,
  MoreVertical
} from "lucide-react";
import { usePlatformOrgs, useUpdatePlatformOrgStatus } from "../hooks/usePlatformOrgs";
import Badge from "../../../shared/components/ui/Badge";

export default function PlatformOrgListPage() {
  const navigate = useNavigate();
  const { data: orgs, isLoading, isError, refetch } = usePlatformOrgs();
  const { mutate: updateStatus } = useUpdatePlatformOrgStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
        <div className="flex flex-col items-center gap-2">
          <Building2 className="w-10 h-10 opacity-20" />
          <span className="text-sm font-medium uppercase tracking-widest">Loading Organizations...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4 border border-red-100">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Connection Failed</h2>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't retrieve the organization list. Please check your network connection and try again.</p>
        <button 
          onClick={() => refetch()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ================= Header Section ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
             <ShieldCheck className="w-4 h-4 text-indigo-600" />
             <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">Platform Management</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Organizations</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium max-w-xl">
            Managing <span className="text-gray-900 font-bold">{orgs?.length || 0}</span> enterprise entities across the ecosystem. Monitor usage and control access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={() => refetch()}
            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl border border-gray-200 bg-white transition-all shadow-sm"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= Stats Overview (Mini) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Entities</p>
            <p className="text-2xl font-black text-gray-900">{orgs?.length || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Orgs</p>
            <p className="text-2xl font-black text-gray-900">{orgs?.filter(o => o.status === 'ACTIVE').length || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Volume</p>
            <p className="text-2xl font-black text-gray-900">{orgs?.reduce((acc, curr) => acc + (curr.messageCount || 0), 0).toLocaleString() || 0}</p>
          </div>
        </div>
      </div>

      {/* ================= Organizations Table ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Organization Name</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Message Volume</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Access Controls</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {orgs?.map((org) => (
                <tr 
                  key={org.id} 
                  className="group hover:bg-gray-50/80 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm font-black text-sm group-hover:scale-110 transition-transform">
                        {org.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => navigate(`/platform/orgs/${org.id}`)}>
                          {org.name}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">ID: {org.id.split('-')[0]}...</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-center">
                    <Badge color={org.status === "ACTIVE" ? "green" : "gray"}>
                      {org.status}
                    </Badge>
                  </td>

                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-black text-gray-700">{org.messageCount?.toLocaleString() || 0}</span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-400 rounded-full" 
                          style={{ width: `${Math.min((org.messageCount || 0) / 100, 100)}%` }} 
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/platform/orgs/${org.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="View Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() =>
                          updateStatus({
                            orgId: org.id,
                            status: org.status === "ACTIVE" ? "DISABLED" : "ACTIVE",
                          })
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight border transition-all
                          ${org.status === "ACTIVE"
                            ? "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                          }`}
                      >
                        <Power className="w-3 h-3" />
                        {org.status === "ACTIVE" ? "Disable Access" : "Grant Access"}
                      </button>

                      <button className="p-2 text-gray-300 hover:text-gray-600 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
