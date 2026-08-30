import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { journeyMilestones } from "@/data/journey";
import { Calendar } from "lucide-react";

export function JourneySection() {
  return (
    <section id="journey" className="py-20 md:py-28 border-t border-[var(--border)] bg-[var(--background-secondary)]/40">
      <Container>
        <SectionHeading
          badge="EXPERIENCE & EVOLUTION"
          title="DEVELOPMENT JOURNEY"
          description="Chronological progression from core algorithms to building distributed backend and AI systems."
        />

        <div className="relative border-l border-[var(--border)] ml-3 sm:ml-6 md:ml-32 pl-6 sm:pl-8 md:pl-10 space-y-12">
          {journeyMilestones.map((milestone) => (
            <div key={milestone.year} className="relative group">
              {/* Year Label for larger screens (Absolute on the left) */}
              <div className="hidden md:block absolute -left-44 top-0 font-mono text-xl font-extrabold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {milestone.year}
                <span className="block text-[11px] font-normal text-[var(--foreground-muted)] tracking-wider">
                  MILESTONE
                </span>
              </div>

              {/* Glowing Node Dot on Timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] md:-left-[47px] top-1.5 flex items-center justify-center">
                <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[var(--background)] border-2 border-[var(--accent)] group-hover:shadow-[0_0_12px_rgba(14,165,233,0.5)] transition-all">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[var(--accent)]" />
                </span>
              </div>

              {/* Mobile Year Badge */}
              <div className="md:hidden inline-flex items-center gap-1.5 mb-2 font-mono text-sm font-bold text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-0.5 rounded border border-[var(--accent-border)]">
                <Calendar className="h-3.5 w-3.5" />
                {milestone.year}
              </div>

              {/* Milestone Card */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 transition-all group-hover:border-[var(--border-hover)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                    {milestone.title}
                  </h3>
                  {milestone.metrics && (
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 self-start sm:self-auto">
                      {milestone.metrics}
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs text-[var(--accent)] mb-3">
                  {milestone.subtitle}
                </p>

                <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  {milestone.technologies.map((tech) => (
                    <Badge key={tech} variant="default" size="sm" className="font-mono text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
