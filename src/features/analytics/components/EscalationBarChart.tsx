import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EscalationBarChart({
  reasons,
}: {
  reasons: { reason: string; count: number }[];
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-md font-semibold mb-4">Top Escalation Reasons</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={reasons}>
          <XAxis dataKey="reason" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#f97316" /> {/* orange */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
