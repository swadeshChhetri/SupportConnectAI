// import { useUsageAnalyticsQuery } from "../../features/analytics/hooks/useUsageAnalyticsQuery";
// import MonthlyTicketsChart from "../../components/charts/MonthlyTicketsChart";
// import MonthlyMessagesChart from "../../components/charts/MonthlyMessagesChart";
// import AIUsageAreaChart from "../../components/charts/AIUsageAreaChart";
// import DocumentStatusStackedChart from "../../components/charts/DocumentStatusStackedChart";
// import StatsCard from "../../components/ui/StatsCard";
import { Loader2 } from "lucide-react";
// import MonthlyTicketsChart from "../../features/analytics/components/MonthlyTicketsChart";
import StatsCard from "../../../shared/components/ui/StatsCard";
import MonthlyTicketsChart from "../components/MonthlyTicketsChart";
import { useUsageAnalyticsQuery } from "../hooks/useUsageAnalyticsQuery";
// import DocumentStatusPill from "../../features/kb/components/DocumentStatusPill";

export default function AnalyticsOverviewPage() {
  const { data, isLoading, isError } = useUsageAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="AI Automation Savings"
          value={`$${data.estimatedSavings}`}
          subtitle="Cost saved from AI resolutions"
        />
        <StatsCard
          title="Customer Satisfaction"
          value={`${data.csatScore}%`}
          subtitle="Last 30 days"
        />
        <StatsCard
          title="Messages (30 days)"
          value={data.totalMessages}
          subtitle="Across all chats"
        />
        <StatsCard
          title="Tickets (30 days)"
          value={data.totalTickets}
          subtitle="Created last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyTicketsChart data={data.ticketTrend} />
        {/* <MonthlyMessagesChart data={data.messageTrend} /> */}
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <AIUsageAreaChart data={data.aiUsageTrend} />
        <DocumentStatusStackedChart data={data.documentStatusTrend} /> */}
      </div>
    </div>
  );
}
