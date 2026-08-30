"use client";

import * as React from "react";
import { TimeRange } from "@/types";
import { getAdminAnalytics } from "@/lib/api";
import { AnalyticsStatCard } from "@/components/analytics/AnalyticsStatCard";
import { TrafficChart } from "@/components/analytics/TrafficChart";
import { RankedList } from "@/components/analytics/RankedList";
import {
  UsersIcon,
  EyeIcon,
  AwardIcon,
  MailIcon,
  ChevronDownIcon,
} from "@/components/ui/Icons";

const timeRanges: TimeRange[] = ["Today", "7 Days", "30 Days", "90 Days"];

export function AnalyticsClient() {
  const [selectedRange, setSelectedRange] = React.useState<TimeRange>("30 Days");
  const [analyticsData, setAnalyticsData] = React.useState({
    total_views: 0,
    total_visitors: 0,
    top_pages: [] as { path: string; views: number }[],
  });

  React.useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await getAdminAnalytics();
        if (res.success && res.data) {
          setAnalyticsData(res.data);
        }
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    }
    loadAnalytics();
  }, []);


  return (
    <div className="w-full space-y-6">
      {/* 1. PAGE HEADER */}
      <div className="pb-4 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
            ANALYTICS
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mt-1">
            Portfolio performance overview • <span className="text-[var(--text-muted)]">Demo Metrics</span>
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="relative self-start sm:self-auto">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value as TimeRange)}
            className="appearance-none pl-3.5 pr-8 py-2 text-xs font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-strong)] focus:border-[var(--accent-primary)] focus:outline-none cursor-pointer transition-colors"
          >
            {timeRanges.map((range) => (
              <option key={range} value={range} className="bg-[var(--surface-card)] text-[var(--text-primary)]">
                Range: {range}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
        </div>
      </div>

      {/* 2. METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsStatCard
          label="Total Visitors"
          value={analyticsData.total_visitors}
          change="+100%"
          icon={UsersIcon}
          accentColor="text-purple-400"
        />
        <AnalyticsStatCard
          label="Page Views"
          value={analyticsData.total_views}
          change="+100%"
          icon={EyeIcon}
          accentColor="text-sky-400"
        />
        <AnalyticsStatCard
          label="Certific. Views"
          value={analyticsData.total_views}
          change="+100%"
          icon={AwardIcon}
          accentColor="text-emerald-400"
        />
        <AnalyticsStatCard
          label="Contacts Inquiries"
          value={analyticsData.total_visitors}
          change="+100%"
          icon={MailIcon}
          accentColor="text-amber-400"
        />
      </div>

      {/* 3. TOP PAGES RANKINGS */}
      <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-4 font-mono">
        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
          LIVE TOP VISITED PATHS
        </h3>
        {analyticsData.top_pages.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)]">No telemetry visits logged yet. Visit pages on public site to track.</p>
        ) : (
          <div className="divide-y divide-[var(--border-subtle)] text-xs">
            {analyticsData.top_pages.map((p, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <span className="text-[var(--text-primary)]">{p.path}</span>
                <span className="text-[var(--accent-primary)] font-bold">{p.views} views</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

