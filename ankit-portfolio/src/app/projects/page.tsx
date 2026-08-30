import * as React from "react";
import { Container } from "@/components/ui/Container";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects | Ankit Kumar - AI & Software Developer",
  description:
    "Explore production applications, full-stack systems, AI architectures, and backend pipelines engineered by Ankit Kumar.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full py-12 md:py-20 lg:py-24">
      <Container>
        {/* SECTION 1 — PAGE HEADER */}
        <header className="max-w-3xl mb-12 md:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase">
              SELECTED WORK
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight mb-4">
            PROJECTS
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] leading-relaxed">
            Production applications, experiments and engineering systems
          </p>
        </header>

        {/* SECTION 2 & 3 — INTERACTIVE FILTERS & RESPONSIVE GRID */}
        <ProjectGrid initialProjects={projects} />
      </Container>
    </div>
  );
}
