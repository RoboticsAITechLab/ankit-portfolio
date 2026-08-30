import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/ui/Icons";
import { CaseStudyArchitecture } from "@/components/projects/CaseStudyArchitecture";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Code2,
  Server,
  Database,
  Layers,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Ankit Kumar",
    };
  }

  return {
    title: `${project.title} — Case Study | Ankit Kumar`,
    description: project.description,
  };
}

function CategoryIcon({ categoryTag }: { categoryTag: string }) {
  switch (categoryTag) {
    case "AI":
      return <Brain className="h-8 w-8 text-[var(--accent)]" />;
    case "Full-Stack":
      return <Layers className="h-8 w-8 text-[var(--accent)]" />;
    case "Backend":
      return <Server className="h-8 w-8 text-[var(--accent)]" />;
    case "Data":
      return <Database className="h-8 w-8 text-[var(--accent)]" />;
    default:
      return <Code2 className="h-8 w-8 text-[var(--accent)]" />;
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const liveHref = project.liveUrl || project.demoUrl;

  return (
    <div className="flex flex-col w-full py-12 md:py-16 lg:py-20">
      <Container>
        {/* TOP NAVIGATION BREADCRUMB */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-subtle)]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>Projects</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          {project.year && (
            <span className="font-mono text-xs text-[var(--foreground-muted)]">
              {project.year} {"//"} Case Study
            </span>
          )}
        </div>

        {/* 1. CASE STUDY HEADER */}
        <header className="max-w-4xl mb-12">
          {/* Eyebrow / Category */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="accent" size="md" className="font-mono text-xs uppercase">
              {project.category}
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.08] mb-6">
            {project.title}
          </h1>

          {/* Lead Sentence */}
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--foreground-secondary)] leading-relaxed mb-8">
            {project.leadDescription || project.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {liveHref && (
              <a href={liveHref} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="primary" className="font-mono text-sm gap-2">
                  <span>Live Demo</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            )}

            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="font-mono text-sm gap-2">
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            )}
          </div>
        </header>

        {/* 2. HERO VISUAL */}
        <div className="relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[340px] md:min-h-[420px] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 md:p-14 mb-16 md:mb-24 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Background Technical Grid & Ambient Lighting */}
          <div className="absolute inset-0 bg-grid-subtle opacity-40" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Visual Status Bar */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[var(--foreground)] uppercase font-semibold">
                SYSTEM SPECIFICATION
              </span>
            </div>
            <span className="text-[var(--foreground-muted)]">
              ARCH_ID: {project.id.toUpperCase()}
            </span>
          </div>

          {/* Center Focal Visual Mark */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-6">
            <div className="p-5 rounded-[var(--radius-xl)] bg-[var(--card)]/90 border border-[var(--border)] shadow-[0_0_30px_rgba(14,165,233,0.2)] mb-4">
              <CategoryIcon categoryTag={project.categoryTag} />
            </div>
            <span className="font-mono text-sm sm:text-base font-bold text-[var(--foreground)] tracking-wider uppercase">
              {project.category} Architecture
            </span>
            <span className="font-mono text-xs text-[var(--foreground-muted)] mt-1">
              Production Verified • Type-Safe Implementation
            </span>
          </div>

          {/* Bottom Visual Tags */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--foreground-muted)]">
            <span>Security & Validation: Verified</span>
            <span>Execution: Production</span>
          </div>
        </div>

        {/* 3. OVERVIEW: PROBLEM & SOLUTION */}
        {project.overview && (
          <section className="mb-16 md:mb-24">
            <div className="mb-8">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                EXECUTIVE SUMMARY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                OVERVIEW
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem Column */}
              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">
                      Problem
                    </h3>
                  </div>
                  <p className="text-base text-[var(--foreground-secondary)] leading-relaxed">
                    {project.overview.problem}
                  </p>
                </div>
              </div>

              {/* Solution Column */}
              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">
                      Solution
                    </h3>
                  </div>
                  <p className="text-base text-[var(--foreground-secondary)] leading-relaxed">
                    {project.overview.solution}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. ARCHITECTURE */}
        {project.architecture && (
          <section className="mb-16 md:mb-24">
            <div className="mb-8">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                SYSTEM TOPOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                ARCHITECTURE
              </h2>
            </div>

            <CaseStudyArchitecture architecture={project.architecture} />
          </section>
        )}

        {/* 5. KEY FEATURES */}
        {project.features && project.features.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="mb-8">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                CORE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                KEY FEATURES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature) => (
                <Card
                  key={feature.number}
                  hoverEffect
                  className="p-6 sm:p-8 flex flex-col justify-between border-[var(--border)] bg-[var(--card)]"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded border border-[var(--accent-border)] inline-block mb-4">
                      {feature.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 6. TECHNOLOGY STACK */}
        <section className="mb-16 md:mb-24">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
              DEPENDENCIES & TOOLS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              TECHNOLOGY STACK
            </h2>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tech) => (
                <Badge
                  key={tech}
                  variant="default"
                  size="md"
                  className="font-mono text-xs sm:text-sm px-3.5 py-1.5"
                >
                  <Cpu className="h-3.5 w-3.5 text-[var(--accent)]" />
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* 7. IMPLEMENTATION */}
        {project.implementation && project.implementation.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="mb-8">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                ENGINEERING DECISIONS & TRADE-OFFS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                IMPLEMENTATION
              </h2>
            </div>

            <div className="space-y-6">
              {project.implementation.map((note, idx) => (
                <div
                  key={idx}
                  className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 transition-colors hover:border-[var(--border-hover)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-[var(--accent)]" />
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] font-mono">
                      {note.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-4">
                    {note.description}
                  </p>

                  {note.highlight && (
                    <div className="flex items-start gap-2.5 pt-3 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--accent)]">
                      <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{note.highlight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. RESULTS */}
        {project.results && project.results.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="mb-8">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                VERIFIABLE OUTCOMES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                RESULTS
              </h2>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 md:p-10">
              <ul className="space-y-4">
                {project.results.map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-[var(--foreground)] leading-relaxed"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 9. BOTTOM NAVIGATION */}
        <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between">
          <Link href="/projects">
            <Button size="lg" variant="secondary" className="font-mono text-sm gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          {liveHref && (
            <a href={liveHref} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="primary" className="font-mono text-sm gap-2">
                Explore Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </Container>
    </div>
  );
}
