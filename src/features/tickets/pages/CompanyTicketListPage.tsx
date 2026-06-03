import { Search, Filter, Ticket, User } from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import { useTicketsQuery } from "../hooks/useTicketsQuery";

export default function CompanyTicketListPage() {
  const { data: tickets = [], isLoading, isError } = useTicketsQuery({});

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <p className="font-bold text-sm tracking-widest uppercase">Fetching Tickets...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-400 gap-4">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">⚠️</div>
        <p className="font-bold text-sm tracking-widest uppercase">Error loading tickets</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">Support Tickets</h1>
          <p className="text-sm font-semibold text-gray-500">Manage and monitor all company requests</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="bg-white border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase">Subject & ID</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase text-center">Priority</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase">Assignee</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic font-semibold">
                    No tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                          <Ticket className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 leading-tight mb-1">{t.subject}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">#{t.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Badge color={t.status === "OPEN" ? "green" : "yellow"}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Badge
                        color={
                          t.priority === "HIGH" || t.priority === "URGENT"
                            ? "red"
                            : t.priority === "MEDIUM" 
                              ? "orange"
                              : "blue"
                        }
                      >
                        {t.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-bold text-gray-600 truncate max-w-[150px]">
                          {t.assignedTo?.name ?? "Unassigned"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}