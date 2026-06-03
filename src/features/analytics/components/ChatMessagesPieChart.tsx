import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChatMessagesPieChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const COLORS = ["#2563eb", "#16a34a"]; // Blue + Green

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-md font-semibold mb-4">AI vs Human Messages</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
