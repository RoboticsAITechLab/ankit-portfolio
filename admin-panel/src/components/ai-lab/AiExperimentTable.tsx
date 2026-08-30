"use client";

import * as React from "react";
import { AdminAiExperiment } from "@/types";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import {
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
} from "@/components/ui/Icons";

interface AiExperimentTableProps {
  experiments: AdminAiExperiment[];
  onEdit: (exp: AdminAiExperiment) => void;
  onDelete: (exp: AdminAiExperiment) => void;
  onToggleStatus: (exp: AdminAiExperiment) => void;
}

export function AiExperimentTable({
  experiments,
  onEdit,
  onDelete,
  onToggleStatus,
}: AiExperimentTableProps) {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (experiments.length === 0) {
    return (
      <div className="py-16 text-center rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] p-8">
        <p className="text-sm font-mono text-[var(--text-muted)] mb-2">
          No AI experiments matched your criteria.
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Try clearing your search query or reset category and status filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 1. DESKTOP & TABLET TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/50 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-3 px-4 font-semibold">Experiment</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Updated</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs sm:text-sm">
            {experiments.map((exp) => (
              <tr
                key={exp.id}
                className="hover:bg-[var(--surface-hover)]/60 transition-colors group"
              >
                {/* Experiment Cell */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold font-mono text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {exp.name}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[280px]">
                      /{exp.slug}
                    </span>
                  </div>
                </td>

                {/* Category Cell */}
                <td className="py-3.5 px-4 font-mono text-xs">
                  <Badge variant="default" size="sm">
                    {exp.category}
                  </Badge>
                </td>

                {/* Status Cell */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={exp.status} />
                </td>

                {/* Updated Cell */}
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-muted)] whitespace-nowrap">
                  {exp.updatedAt}
                </td>

                {/* Actions Cell */}
                <td className="py-3.5 px-4 text-right relative">
                  <div
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === exp.id ? null : exp.id
                        )
                      }
                      aria-label={`Actions for ${exp.name}`}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>

                    {openMenuId === exp.id && (
                      <div
                        role="menu"
                        className="absolute right-4 top-10 w-48 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-1 shadow-2xl z-30 font-mono text-xs text-left"
                      >
                        {/* Explore / View Action */}
                        <a
                          href={exp.demoUrl || exp.repoUrl || "https://github.com/RoboticsAITechLab"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          onClick={() => setOpenMenuId(null)}
                        >
                          <EyeIcon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                          <span>View Sandbox</span>
                          <ExternalLinkIcon className="h-3 w-3 ml-auto opacity-60" />
                        </a>

                        {/* Edit Action */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onEdit(exp);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <EditIcon className="h-3.5 w-3.5 text-sky-400" />
                          <span>Edit</span>
                        </button>

                        {/* Status Toggle */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onToggleStatus(exp);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <RefreshCwIcon className="h-3.5 w-3.5 text-emerald-400" />
                          <span>
                            {exp.status === "Production-Ready"
                              ? "Mark as Experiment"
                              : "Promote to Production"}
                          </span>
                        </button>

                        <div className="h-[1px] bg-[var(--border-subtle)] my-1" />

                        {/* Delete Action */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onDelete(exp);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-red-500/15 text-red-400 transition-colors text-left"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. MOBILE CARD LIST VIEW */}
      <div className="md:hidden space-y-3">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                  {exp.name}
                </h4>
                <p className="text-[11px] font-mono text-[var(--text-muted)]">
                  /{exp.slug}
                </p>
              </div>
              <StatusBadge status={exp.status} />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                {exp.category}
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Updated: {exp.updatedAt}
              </span>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 font-mono text-xs">
              <a
                href={exp.demoUrl || exp.repoUrl || "https://github.com/RoboticsAITechLab"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <EyeIcon className="h-3 w-3 text-[var(--accent-primary)]" />
                <span>View</span>
              </a>

              <button
                onClick={() => onEdit(exp)}
                className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <EditIcon className="h-3 w-3 text-sky-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onToggleStatus(exp)}
                className="px-2 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title="Toggle status"
              >
                <RefreshCwIcon className="h-3 w-3 text-emerald-400" />
              </button>

              <button
                onClick={() => onDelete(exp)}
                className="px-2 py-1.5 rounded-[var(--radius-sm)] bg-red-500/10 border border-red-500/20 text-red-400"
                title="Delete"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
