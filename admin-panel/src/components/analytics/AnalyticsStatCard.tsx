import * as React from "react";
import { TrendingUpIcon } from "@/components/ui/Icons";

interface AnalyticsStatCardProps {
  label: string;
  value: number | string;
  change: string;
  icon?: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}

export function AnalyticsStatCard({
  label,
  value,
  change,
  icon: Icon,
  accentColor = "text-sky-400",
}: AnalyticsStatCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="p-5 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all font-mono">
      <div className="flex items-center justify-between mb-3 text-xs text-[var(--text-muted)] uppercase tracking-wider">
        <span>{label}</span>
        {Icon && <Icon className={`h-4 w-4 ${accentColor}`} />}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-3xl font-bold text-[var(--text-primary)]">
          {value}
        </span>

        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
            isPositive
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/15 text-red-400 border border-red-500/20"
          }`}
        >
          <TrendingUpIcon className="h-3 w-3" />
          <span>{change}</span>
        </span>
      </div>
    </div>
  );
}
