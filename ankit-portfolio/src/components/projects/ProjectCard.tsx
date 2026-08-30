import * as React from "react";
import Link from "next/link";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight, ArrowRight, Brain, Code2, Server, Database, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

function CategoryIcon({ categoryTag }: { categoryTag: string }) {
  switch (categoryTag) {
    case "AI":
      return <Brain className="h-7 w-7" />;
    case "Full-Stack":
      return <Layers className="h-7 w-7" />;
    case "Backend":
      return <Server className="h-7 w-7" />;
    case "Data":
      return <Database className="h-7 w-7" />;
    default:
      return <Code2 className="h-7 w-7" />;
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const caseStudyHref = project.caseStudyUrl || `/projects/${project.slug}`;
  const liveHref = project.liveUrl || project.demoUrl;

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)] group relative overflow-hidden",
        project.featured && "border-[var(--border)] shadow-sm"
      )}
    >
      {/* Top Visual Area */}
      <div className="relative w-full aspect-[16/9] mb-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex flex-col justify-between p-5 group-hover:border-[var(--accent-border)] transition-colors">
        {/* Background Technical Grid Texture */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--accent)]/10 rounded-full blur-2xl group-hover:bg-[var(--accent)]/20 transition-all pointer-events-none" />

        {/* Top Visual Bar: Category Pill & Year */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge variant="accent" size="sm" className="font-mono text-[10px] uppercase">
            {project.category}
          </Badge>
          {project.year && (
            <span className="font-mono text-xs text-[var(--foreground-muted)]">
              {project.year}
            </span>
          )}
        </div>

        {/* Central Abstract Category Node */}
        <div className="relative z-10 flex items-center gap-3 self-center my-auto">
          <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--card)]/90 border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:shadow-[0_0_16px_rgba(14,165,233,0.25)] transition-all">
            <CategoryIcon categoryTag={project.categoryTag} />
          </div>
        </div>

        {/* Bottom Technical Status Indicator */}
        <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[var(--foreground-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Production System
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-secondary)]">
            {project.categoryTag}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1.5">
          {project.title}
        </h3>

        {/* Category Label */}
        <p className="font-mono text-xs text-[var(--accent)] mb-3">
          {project.category}
        </p>

        {/* Concise Description */}
        <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Technology Tag Pills (3-5 max) */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
          {project.tags.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="default" size="sm" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Links Row */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs sm:text-sm font-mono">
        <Link
          href={caseStudyHref}
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group/link"
        >
          Case Study
          <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}

          {liveHref && (
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors"
              title="Live Demo"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
