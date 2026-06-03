// src/components/charts/ResolutionPieChart.tsx
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#10b981", "#60a5fa", "#f97316", "#f43f5e"];

export default function ResolutionPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-64">
      <h3 className="text-sm font-medium mb-2">Resolution Breakdown</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
