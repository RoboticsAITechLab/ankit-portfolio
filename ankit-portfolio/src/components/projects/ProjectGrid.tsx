"use client";

import * as React from "react";
import { Project, ProjectCategoryFilter } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  initialProjects: Project[];
}

const filterOptions: ProjectCategoryFilter[] = [
  "All",
  "AI",
  "Full-Stack",
  "Backend",
  "Data",
];

export function ProjectGrid({ initialProjects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = React.useState<ProjectCategoryFilter>("All");
  const [showAllCount, setShowAllCount] = React.useState(4);

  // Filter projects by active tab
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "All") {
      return initialProjects;
    }
    return initialProjects.filter((p) => p.categoryTag === activeFilter);
  }, [initialProjects, activeFilter]);

  // Determine currently visible projects
  const visibleProjects = React.useMemo(() => {
    return filteredProjects.slice(0, showAllCount);
  }, [filteredProjects, showAllCount]);

  const hasMore = visibleProjects.length < filteredProjects.length;

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 2 — PROJECT FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 md:mb-12 pb-6 border-b border-[var(--border)]">
        {/* Filter Buttons Group */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2"
        >
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            const count =
              filter === "All"
                ? initialProjects.length
                : initialProjects.filter((p) => p.categoryTag === filter).length;

            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAllCount(4); // reset pagination on filter switch
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-[var(--radius-sm)] font-mono text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-[0_0_14px_rgba(14,165,233,0.3)]"
                    : "bg-[var(--surface)] text-[var(--foreground-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--foreground)]"
                )}
              >
                <span>{filter}</span>
                <span
                  className={cn(
                    "ml-2 text-[10px] px-1.5 py-0.2 rounded font-mono",
                    isActive
                      ? "bg-black/20 text-[var(--accent-foreground)] font-bold"
                      : "bg-[var(--card)] text-[var(--foreground-muted)]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result Counter Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground-muted)]">
          <Filter className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>
            Showing <strong className="text-[var(--foreground)]">{visibleProjects.length}</strong> of{" "}
            <strong className="text-[var(--foreground)]">{filteredProjects.length}</strong> projects
          </span>
        </div>
      </div>

      {/* SECTION 3 — PROJECT GRID */}
      {visibleProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-8">
          <p className="font-mono text-sm text-[var(--foreground-muted)] mb-4">
            No projects found in category &ldquo;{activeFilter}&rdquo;.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setActiveFilter("All")}
            className="font-mono text-xs"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* MORE PROJECTS BOTTOM ACTION */}
      {hasMore ? (
        <div className="mt-16 md:mt-20 pt-8 border-t border-[var(--border)] flex justify-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setShowAllCount((prev) => prev + 4)}
            className="font-mono text-sm gap-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors group"
          >
            MORE PROJECTS
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-[var(--accent)]" />
          </Button>
        </div>
      ) : (
        <div className="mt-16 md:mt-20 pt-8 border-t border-[var(--border)] flex items-center justify-center font-mono text-xs text-[var(--foreground-muted)] gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>All categorized engineering projects loaded</span>
        </div>
      )}
    </div>
  );
}
