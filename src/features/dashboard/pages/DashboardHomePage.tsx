// // src/pages/dashboard/DashboardHomePage.tsx
// import React, { useEffect, useState } from "react";

// // UI components
// import StatsCard from "../../components/ui/StatsCard";
// import TicketTrendChart from "../../components/charts/TicketTrendChart";
// import ResolutionPieChart from "../../components/charts/ResolutionPieChart";


// // API (normal imports, NOT type imports)
// import {
//   fetchOverview,
//   fetchTicketTrend,
//   fetchResolutionBreakdown,
//   fetchRecentActivity,
// } from "../../api/analyticsApi";

// // Types (type-only imports)
// import type {
//   OverviewStats,
//   TicketTrendPoint,
//   RecentActivityItem,
// } from "../../api/analyticsApi";

// // lucide-react icons
// import {
//   Ticket,
//   Sparkles,
//   MessageCircle,
//   FileText,
// } from "lucide-react";


// import { useOverviewQuery,  useTicketTrendQuery,
//     useResolutionBreakdownQuery,
//     useRecentActivityQuery, } from "../../features/dashboard/hooks";

// export default function DashboardHomePage() {
//   const [overview, setOverview] = useState<OverviewStats | null>(null);
//   const [trend, setTrend] = useState<TicketTrendPoint[]>([]);
//   const [breakdown, setBreakdown] = useState<{ name: string; value: number }[]>([]);
//   const [activity, setActivity] = useState<RecentActivityItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     async function load() {
//       try {
//         setLoading(true);

//         const [ov, tr, br, act] = await Promise.all([
//           fetchOverview(),
//           fetchTicketTrend(),
//           fetchResolutionBreakdown(),
//           fetchRecentActivity(),
//         ]);

//         if (!mounted) return;

//         setOverview(ov);
//         setTrend(tr);
//         setBreakdown(br);
//         setActivity(act);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Welcome back!</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Quick overview of your support operations.
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <StatsCard
//           title="Total Tickets"
//           value={overview ? overview.totalTickets : "—"}
//           subtitle="All time"
//           icon={<Ticket className="w-6 h-6 text-blue-600" />}
//         />
//         <StatsCard
//           title="Open Tickets"
//           value={overview ? overview.openTickets : "—"}
//           subtitle="Needs attention"
//           icon={<Sparkles className="w-6 h-6 text-orange-600" />}
//         />
//         <StatsCard
//           title="AI Resolved"
//           value={overview ? overview.aiResolved : "—"}
//           subtitle="Auto-responses"
//           icon={<MessageCircle className="w-6 h-6 text-green-600" />}
//         />
//         <StatsCard
//           title="Active Chats"
//           value={overview ? overview.activeChats : "—"}
//           subtitle="Live sessions"
//           icon={<FileText className="w-6 h-6 text-purple-600" />}
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <div className="lg:col-span-2">
//           <TicketTrendChart data={trend} />
//         </div>

//         <div className="space-y-4">
//           <ResolutionPieChart data={breakdown} />

//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <h3 className="text-sm font-medium mb-2">Key metrics</h3>
//             <div className="grid grid-cols-2 gap-3">
//               <div className="text-sm text-gray-500">Knowledge Docs</div>
//               <div className="font-semibold">{overview?.knowledgeDocs ?? "—"}</div>

//               <div className="text-sm text-gray-500">Avg. Response</div>
//               <div className="font-semibold">
//                 {overview
//                   ? `${Math.round(overview.avgResponseTimeSeconds / 60)}m`
//                   : "—"}
//               </div>

//               <div className="text-sm text-gray-500">AI Rate</div>
//               <div className="font-semibold">
//                 {overview
//                   ? `${Math.round(
//                       (overview.aiResolved / Math.max(1, overview.totalTickets)) *
//                         100
//                     )}%`
//                   : "—"}
//               </div>

//               <div className="text-sm text-gray-500">Open Rate</div>
//               <div className="font-semibold">
//                 {overview
//                   ? `${Math.round(
//                       (overview.openTickets / Math.max(1, overview.totalTickets)) *
//                         100
//                     )}%`
//                   : "—"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
//         <h3 className="text-lg font-medium mb-4">Recent activity</h3>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-sm text-gray-500 border-b">
//                 <th className="py-2">Type</th>
//                 <th className="py-2">Title</th>
//                 <th className="py-2">User</th>
//                 <th className="py-2">Status</th>
//                 <th className="py-2">When</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="py-6 text-center text-gray-400">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : activity.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="py-6 text-center text-gray-400">
//                     No recent activity
//                   </td>
//                 </tr>
//               ) : (
//                 activity.map((a) => (
//                   <tr key={a.id} className="border-b">
//                     <td className="py-3 text-sm capitalize">{a.type}</td>
//                     <td className="py-3 text-sm">{a.title}</td>
//                     <td className="py-3 text-sm">{a.user ?? "-"}</td>
//                     <td className="py-3 text-sm">{a.status ?? "-"}</td>
//                     <td className="py-3 text-sm text-gray-500">
//                       {new Date(a.createdAt).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

// UI components
// import StatsCard from "../../components/ui/StatsCard";

// import TicketTrendChart from "../../components/charts/TicketTrendChart";
// import ResolutionPieChart from "../../components/charts/ResolutionPieChart";


// Icons
import {
  Ticket,
  Sparkles,
  MessageCircle,
  FileText,
} from "lucide-react";

// React Query hooks
// import { useOverviewQuery } from "../../features/dashboard/hooks/useOverviewQuery";

// import { useTicketTrendQuery } from "../../features/dashboard/hooks/useTicketTrendQuery";

// import { useRecentActivityQuery } from "../../features/dashboard/hooks/useRecentActivityQuery";

// import { useResolutionBreakdownQuery } from "../../features/dashboard/hooks/useResolutionBreakddownQuery";

import StatsCard from "../../../shared/components/ui/StatsCard";
import TicketTrendChart from "../../tickets/components/TicketTrendChart";
import ResolutionPieChart from "../../analytics/components/ResolutionPieChart";
import { useOverviewQuery } from "../hooks/useOverviewQuery";
import { useTicketTrendQuery } from "../hooks/useTicketTrendQuery";
import { useRecentActivityQuery } from "../hooks/useRecentActivityQuery";
import { useResolutionBreakdownQuery } from "../hooks/useResolutionBreakddownQuery";

export default function DashboardHomePage() {
  // ----------------------------
  // React Query Hooks
  // ----------------------------
  const {
    data: overview,
    isLoading: loadingOverview,
    isError: overviewError,
  } = useOverviewQuery();

  const {
    data: trend,
    isLoading: loadingTrend,
    isError: trendError,
  } = useTicketTrendQuery();

  const {
    data: breakdown,
    isLoading: loadingBreakdown,
    isError: breakdownError,
  } = useResolutionBreakdownQuery();

  const {
    data: activity,
    isLoading: loadingActivity,
    isError: activityError,
  } = useRecentActivityQuery();

  const loading =
    loadingOverview || loadingTrend || loadingBreakdown || loadingActivity;

  const error =
    overviewError || trendError || breakdownError || activityError;

  // ----------------------------
  // Error UI
  // ----------------------------
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div>
      {/* -------------------------------- */}
      {/* TOP SECTION                     */}
      {/* -------------------------------- */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quick overview of your support operations.
          </p>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* STATS CARDS                     */}
      {/* -------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Tickets"
          value={overview?.totalTickets ?? "—"}
          subtitle="All time"
          icon={<Ticket className="w-6 h-6 text-blue-600" />}
        />

        <StatsCard
          title="Open Tickets"
          value={overview?.openTickets ?? "—"}
          subtitle="Needs attention"
          icon={<Sparkles className="w-6 h-6 text-orange-600" />}
        />

        <StatsCard
          title="AI Resolved"
          value={overview?.aiResolved ?? "—"}
          subtitle="Auto responses"
          icon={<MessageCircle className="w-6 h-6 text-green-600" />}
        />

        <StatsCard
          title="Active Chats"
          value={overview?.activeChats ?? "—"}
          subtitle="Live sessions"
          icon={<FileText className="w-6 h-6 text-purple-600" />}
        />
      </div>

      {/* -------------------------------- */}
      {/* CHARTS                          */}
      {/* -------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TicketTrendChart data={trend ?? []} loading={loadingTrend} />
        </div>

        <div className="space-y-4">
          <ResolutionPieChart data={breakdown ?? []} loading={loadingBreakdown} />

          {/* Key metrics */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium mb-2">Key metrics</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm text-gray-500">Knowledge Docs</div>
              <div className="font-semibold">
                {overview?.knowledgeDocs ?? "—"}
              </div>

              <div className="text-sm text-gray-500">Avg. Response</div>
              <div className="font-semibold">
                {overview
                  ? `${Math.round(overview.avgResponseTimeSeconds / 60)}m`
                  : "—"}
              </div>

              <div className="text-sm text-gray-500">AI Rate</div>
              <div className="font-semibold">
                {overview
                  ? `${Math.round(
                      (overview.aiResolved /
                        Math.max(1, overview.totalTickets)) *
                        100
                    )}%`
                  : "—"}
              </div>

              <div className="text-sm text-gray-500">Open Rate</div>
              <div className="font-semibold">
                {overview
                  ? `${Math.round(
                      (overview.openTickets /
                        Math.max(1, overview.totalTickets)) *
                        100
                    )}%`
                  : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* RECENT ACTIVITY TABLE           */}
      {/* -------------------------------- */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">Recent activity</h3>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-2">Type</th>
                <th className="py-2">Title</th>
                <th className="py-2">User</th>
                <th className="py-2">Status</th>
                <th className="py-2">When</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : !activity || activity.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-400">
                    No recent activity
                  </td>
                </tr>
              ) : (
                activity.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="py-3 text-sm capitalize">{a.type}</td>
                    <td className="py-3 text-sm">{a.title}</td>
                    <td className="py-3 text-sm">{a.user ?? "-"}</td>
                    <td className="py-3 text-sm">{a.status ?? "-"}</td>
                    <td className="py-3 text-sm text-gray-500">
                      {new Date(a.createdAt).toLocaleString()}
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
