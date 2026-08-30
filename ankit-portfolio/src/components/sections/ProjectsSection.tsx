import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        {/* Section Header with View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeading
            badge="PORTFOLIO"
            title="FEATURED PROJECTS"
            description="Production-grade AI systems, autonomous agents, and full-stack software applications."
            className="mb-0"
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors self-start sm:self-end pb-2 group"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
