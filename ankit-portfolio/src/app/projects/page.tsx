import * as React from "react";
import { Container } from "@/components/ui/Container";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getProjects } from "@/lib/api";
import { projects as fallbackProjects } from "@/data/projects";

export const metadata = {
  title: "Projects | Ankit Kumar - AI & Software Developer",
  description:
    "Explore production applications, full-stack systems, AI architectures, and backend pipelines engineered by Ankit Kumar.",
};

export default async function ProjectsPage() {
  let projectList = fallbackProjects;
  try {
    const res = await getProjects();
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      projectList = res.data.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category || "AI",
        categoryTag: (p.category as any) || "AI",
        description: p.description,
        tags: p.technologies || [],
        featured: p.featured,
        githubUrl: p.github_url || undefined,
        liveUrl: p.demo_url || undefined,
        year: new Date(p.created_at || Date.now()).getFullYear().toString(),
      }));
    }
  } catch (e) {
    console.error("Failed to load projects from API, using fallback", e);
  }

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
        <ProjectGrid initialProjects={projectList} />
      </Container>
    </div>
  );
}

