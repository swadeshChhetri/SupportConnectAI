// src/components/ui/StatsCard.tsx
import React from "react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  className = "",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 flex items-center ${className}`}>
      {icon && <div className="mr-4 text-2xl">{icon}</div>}
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
        {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}
