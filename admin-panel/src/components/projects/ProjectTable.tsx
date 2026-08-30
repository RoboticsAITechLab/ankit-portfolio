"use client";

import * as React from "react";
import { AdminProject } from "@/types";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import {
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
} from "@/components/ui/Icons";

interface ProjectTableProps {
  projects: AdminProject[];
  onEdit: (project: AdminProject) => void;
  onDelete: (project: AdminProject) => void;
  onToggleStatus: (project: AdminProject) => void;
}

export function ProjectTable({
  projects,
  onEdit,
  onDelete,
  onToggleStatus,
}: ProjectTableProps) {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  // Close open action menu on outside click
  React.useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] p-8">
        <p className="text-sm font-mono text-[var(--text-muted)] mb-2">
          No projects matched your criteria.
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Try adjusting your search query or reset category and status filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 1. DESKTOP & TABLET TABLE VIEW (Hidden on small mobile) */}
      <div className="hidden md:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/50 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-3 px-4 font-semibold">Project</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Updated</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs sm:text-sm">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-[var(--surface-hover)]/60 transition-colors group"
              >
                {/* Project Cell */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold font-mono text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {project.title}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[280px]">
                      /{project.slug}
                    </span>
                  </div>
                </td>

                {/* Category Cell */}
                <td className="py-3.5 px-4">
                  <Badge variant="default" size="sm">
                    {project.category}
                  </Badge>
                </td>

                {/* Status Cell */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={project.status} />
                </td>

                {/* Updated Cell */}
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-secondary)] whitespace-nowrap">
                  {project.updatedAt}
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
                          prev === project.id ? null : project.id
                        )
                      }
                      aria-label={`Actions for ${project.title}`}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>

                    {/* Dropdown Action Menu */}
                    {openMenuId === project.id && (
                      <div
                        role="menu"
                        className="absolute right-4 top-10 w-44 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-1 shadow-2xl z-30 font-mono text-xs text-left"
                      >
                        {/* View Action */}
                        <a
                          href={project.liveUrl || project.caseStudyUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          onClick={() => setOpenMenuId(null)}
                        >
                          <EyeIcon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                          <span>View Live</span>
                          <ExternalLinkIcon className="h-3 w-3 ml-auto opacity-60" />
                        </a>

                        {/* Edit Action */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onEdit(project);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <EditIcon className="h-3.5 w-3.5 text-sky-400" />
                          <span>Edit</span>
                        </button>

                        {/* Publish / Unpublish Action */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onToggleStatus(project);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <RefreshCwIcon className="h-3.5 w-3.5 text-emerald-400" />
                          <span>
                            {project.status === "Published"
                              ? "Unpublish (Draft)"
                              : "Publish"}
                          </span>
                        </button>

                        <div className="h-[1px] bg-[var(--border-subtle)] my-1" />

                        {/* Delete Action */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onDelete(project);
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

      {/* 2. MOBILE CARD LIST VIEW (Displayed only on small mobile screens) */}
      <div className="md:hidden space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                  {project.title}
                </h4>
                <p className="text-[11px] font-mono text-[var(--text-muted)]">
                  /{project.slug}
                </p>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                {project.category}
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Updated: {project.updatedAt}
              </span>
            </div>

            {/* Mobile Action Buttons Bar */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 font-mono text-xs">
              <a
                href={project.liveUrl || project.caseStudyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <EyeIcon className="h-3 w-3 text-[var(--accent-primary)]" />
                <span>View</span>
              </a>

              <button
                onClick={() => onEdit(project)}
                className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <EditIcon className="h-3 w-3 text-sky-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onToggleStatus(project)}
                className="px-2 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title={project.status === "Published" ? "Unpublish" : "Publish"}
              >
                <RefreshCwIcon className="h-3 w-3 text-emerald-400" />
              </button>

              <button
                onClick={() => onDelete(project)}
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
