// import { useChatInsightsQuery } from "../../features/analytics/hooks/useChatInsightsQuery";
// import StatsCard from "../../components/ui/StatsCard";
import { Loader2 } from "lucide-react";
// import ChatMessagesPieChart from "../../features/analytics/components/ChatMessagesPieChart";
// import EscalationBarChart from "../../features/analytics/components/EscalationBarChart";
import ConfidenceTrendChart from "../components/ConfidenceTrendChart";
import ChatMessagesPieChart from "../components/ChatMessagesPieChart";
import StatsCard from "../../../shared/components/ui/StatsCard";
import { useChatInsightsQuery } from "../hooks/useChatInsightsQuery";
// import ConfidenceTrendChart from "../../features/analytics/components/ConfidenceTrendChart";

export default function ChatInsightsPage() {
  const { data, isLoading, isError } = useChatInsightsQuery();

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
        Failed to load chat insights.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Chat Insights</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="AI Confidence (avg)"
          value={`${data.avgConfidence.toFixed(1)}%`}
          subtitle="Across all chats"
        />
        <StatsCard
          title="Escalation Rate"
          value={`${data.escalationRate.toFixed(1)}%`}
          subtitle="AI → Human handoff"
        />
        <StatsCard
          title="Avg Human Delay"
          value={`${data.avgHumanDelay}s`}
          subtitle="Agent response"
        />
        <StatsCard
          title="AI/Human Ratio"
          value={`${data.aiMessages}:${data.humanMessages}`}
          subtitle="Message distribution"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <ChatMessagesPieChart
          data={[
            { name: "AI Messages", value: data.aiMessages },
            { name: "Human Messages", value: data.humanMessages },
          ]}
        />

        {/* Escalation Reasons */}
        <EscalationBarChart reasons={data.topEscalationReasons} />

        {/* AI Confidence Over Time */}
        <div className="lg:col-span-3 bg-white rounded shadow p-4">
          <ConfidenceTrendChart data={data.confidenceTrend} />
        </div>
      </div>
    </div>
  );
}
