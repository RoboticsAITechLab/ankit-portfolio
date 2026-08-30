"use client";

import * as React from "react";
import { SearchIcon, ChevronDownIcon, XIcon } from "@/components/ui/Icons";
import { ProjectCategory, ProjectStatus } from "@/types";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onReset: () => void;
  isFiltered: boolean;
}

const categories: (ProjectCategory | "All")[] = [
  "All",
  "AI",
  "Full-Stack",
  "Backend",
  "Frontend",
  "Data",
];

const statuses: (ProjectStatus | "All")[] = [
  "All",
  "Published",
  "Draft",
  "Archived",
];

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onReset,
  isFiltered,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)]">
      {/* Search Input */}
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="Clear search"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Filters Group */}
      <div className="flex items-center gap-2.5">
        {/* Category Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none cursor-pointer transition-colors font-mono"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[var(--surface-card)] text-[var(--text-primary)]">
                {cat === "All" ? "Category: All" : cat}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
        </div>

        {/* Status Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none cursor-pointer transition-colors font-mono"
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-[var(--surface-card)] text-[var(--text-primary)]">
                {status === "All" ? "Status: All" : status}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={onReset}
            className="px-2.5 py-2 text-xs font-mono text-[var(--accent-primary)] hover:underline whitespace-nowrap"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
