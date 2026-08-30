import * as React from "react";
import { RankedItem } from "@/types";

interface RankedListProps {
  title: string;
  subtitle?: string;
  items: RankedItem[];
}

export function RankedList({ title, subtitle, items }: RankedListProps) {
  return (
    <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-4 font-mono">
      <div className="pb-3 border-b border-[var(--border-subtle)]">
        <h3 className="text-sm font-bold text-[var(--text-primary)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[var(--text-muted)] text-[11px] w-4">
                  #{idx + 1}
                </span>
                <span className="font-semibold text-[var(--text-primary)] truncate">
                  {item.name}
                </span>
              </div>
              <span className="text-[var(--accent-primary)] font-bold shrink-0">
                {item.views} <span className="text-[10px] text-[var(--text-muted)] font-normal">views</span>
              </span>
            </div>

            {/* Progress Bar Indicator */}
            {item.percentage !== undefined && (
              <div className="w-full h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent-primary)]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
