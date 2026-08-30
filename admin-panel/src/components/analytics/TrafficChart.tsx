"use client";

import * as React from "react";
import { TrafficPoint } from "@/types";

interface TrafficChartProps {
  data: TrafficPoint[];
}

export function TrafficChart({ data }: TrafficChartProps) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  if (data.length === 0) return null;

  const maxViews = Math.max(...data.map((d) => d.views), 10);
  const chartHeight = 220;
  const chartWidth = 700;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate coordinates for views line
  const points = data.map((d, i) => {
    const x =
      paddingX + (i / (data.length - 1 || 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      (d.views / maxViews) * (chartHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    chartHeight - paddingY
  } L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)] font-mono">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            TRAFFIC OVERVIEW
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Daily unique visitors and page impressions
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[var(--accent-primary)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
            <span>Page Views</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            <span>Visitors</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[500px]">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.33, 0.66, 1].map((ratio, idx) => {
              const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.07)"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 3}
                    textAnchor="end"
                    className="fill-[var(--text-disabled)] font-mono text-[10px]"
                  >
                    {Math.round(ratio * maxViews)}
                  </text>
                </g>
              );
            })}

            {/* Gradient Fill Area */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Main Line Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, idx) => {
              const isHovered = activeIdx === idx;
              return (
                <g
                  key={idx}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? "6" : "4"}
                    fill="#090909"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    className="transition-all"
                  />

                  {/* X-axis Labels */}
                  <text
                    x={p.x}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    className="fill-[var(--text-muted)] font-mono text-[10px]"
                  >
                    {p.label}
                  </text>

                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <g transform={`translate(${p.x}, ${p.y - 35})`}>
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="28"
                        rx="4"
                        fill="#181818"
                        stroke="rgba(255, 255, 255, 0.2)"
                      />
                      <text
                        x="0"
                        y="8"
                        textAnchor="middle"
                        className="fill-[var(--text-primary)] font-mono text-[10px] font-bold"
                      >
                        {p.views} views ({p.visitors} vis)
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
