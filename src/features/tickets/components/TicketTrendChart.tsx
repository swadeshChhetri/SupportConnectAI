// src/components/charts/TicketTrendChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from "recharts";

import type { TicketTrendPoint } from "../../features/dashboard/api/analyticsApi";


type Point = TicketTrendPoint;

export default function TicketTrendChart({ data }: { data: Point[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-64">
      <h3 className="text-sm font-medium mb-2">Ticket Trend (last 30 days)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} dot={false} name="Total" />
          <Line type="monotone" dataKey="open" stroke="#f97316" strokeWidth={2} dot={false} name="Open" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
