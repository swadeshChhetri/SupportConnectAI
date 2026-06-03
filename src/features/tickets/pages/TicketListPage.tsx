import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  User,
  UserCheck,
  RefreshCcw,
  AlertCircle,
  Hash,
  Mail
} from "lucide-react";

import Badge from "../../../shared/components/ui/Badge";
import { useTicketsQuery } from "../hooks/useTicketsQuery";

export default function TicketListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const { data: tickets = [], isLoading, isError, refetch } = useTicketsQuery({
    search: search || undefined,
    status: status !== "ALL" ? status : undefined,
    priority: priority !== "ALL" ? priority : undefined,
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "OPEN": return "green";
      case "IN_PROGRESS": return "yellow";
      case "RESOLVED": return "blue";
      case "CLOSED": return "gray";
      default: return "gray";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "LOW": return "green";
      case "MEDIUM": return "yellow";
      case "HIGH": return "red";
      case "URGENT": return "red";
      default: return "gray";
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ================= Header Section ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Hash className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Support Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Support Tickets</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            You have <span className="text-gray-900 font-bold">{tickets.length}</span> tickets matching your criteria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Refresh tickets"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= Filters Section ================= */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-stretch md:items-center gap-2">

        {/* Search Box */}
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
            placeholder="Search by subject, customer, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="h-8 w-px bg-gray-100 hidden md:block mx-1" />

        {/* Status Filter */}
        <div className="flex items-center gap-2 px-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="bg-transparent border-none text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer py-2 pl-1 pr-8"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 px-2">
          <select
            className="bg-transparent border-none text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer py-2 pl-1 pr-8"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="ALL">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        {/* Clear Button */}
        {(search || status !== "ALL" || priority !== "ALL") && (
          <button
            onClick={() => {
              setSearch("");
              setStatus("ALL");
              setPriority("ALL");
            }}
            className="px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all uppercase tracking-tighter"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ================= Table Section ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Ticket Subject</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Assignment</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Priority</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Activity</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-8">
                      <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                      <span className="text-sm font-medium text-red-500">Failed to load tickets</span>
                    </div>
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Mail className="w-10 h-10 text-gray-200" />
                      <p className="text-sm font-semibold text-gray-400">No tickets found matching those filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => navigate(`/agent/tickets/${t.id}`)}
                    className="group hover:bg-blue-50/50 cursor-pointer transition-all duration-200 border-l-4 border-l-transparent hover:border-l-blue-500"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {t.subject}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase">#{t.id.split('-')[0]}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {t.session?.visitorName || "Anonymous"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {t.assignedTo ? (
                        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg w-fit border border-emerald-100">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold uppercase">{t.assignedTo.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 text-gray-400 rounded-lg w-fit border border-gray-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
                          <span className="text-xs font-bold uppercase italic">Unassigned</span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <Badge color={getStatusBadgeColor(t.status)}>
                        {t.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <Badge color={getPriorityBadgeColor(t.priority)}>
                        {t.priority}
                      </Badge>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </div>
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
