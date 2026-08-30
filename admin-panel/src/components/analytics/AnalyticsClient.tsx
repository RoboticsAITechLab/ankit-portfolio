"use client";

import * as React from "react";
import { TimeRange } from "@/types";
import { analyticsDataByRange } from "@/data/analytics";
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

  const currentData = analyticsDataByRange[selectedRange];

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
          label="Visitors"
          value={currentData.stats.visitors}
          change={currentData.stats.visitorsChange}
          icon={UsersIcon}
          accentColor="text-purple-400"
        />
        <AnalyticsStatCard
          label="Project Views"
          value={currentData.stats.projectViews}
          change={currentData.stats.projectViewsChange}
          icon={EyeIcon}
          accentColor="text-sky-400"
        />
        <AnalyticsStatCard
          label="Certific. Views"
          value={currentData.stats.certViews}
          change={currentData.stats.certViewsChange}
          icon={AwardIcon}
          accentColor="text-emerald-400"
        />
        <AnalyticsStatCard
          label="Contacts"
          value={currentData.stats.contacts.toString().padStart(2, "0")}
          change={currentData.stats.contactsChange}
          icon={MailIcon}
          accentColor="text-amber-400"
        />
      </div>

      {/* 3. TRAFFIC OVERVIEW CHART */}
      <TrafficChart data={currentData.traffic} />

      {/* 4. TOP PROJECTS & TOP PAGES RANKINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RankedList
          title="TOP PROJECTS"
          subtitle="Most viewed engineering showcases"
          items={currentData.topProjects}
        />
        <RankedList
          title="TOP PAGES"
          subtitle="Direct and routed impressions"
          items={currentData.topPages}
        />
      </div>
    </div>
  );
}
