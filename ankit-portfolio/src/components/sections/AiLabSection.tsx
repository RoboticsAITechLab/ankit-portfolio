import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { labExperiments } from "@/data/lab";
import { GithubIcon } from "@/components/ui/Icons";
import { FlaskConical, ArrowRight } from "lucide-react";

export function AiLabSection() {
  return (
    <section id="ai-lab" className="py-20 md:py-28 border-t border-[var(--border)] bg-[var(--background-secondary)]/50">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeading
            badge="EXPERIMENTAL R&D"
            title="AI LAB"
            description="Algorithmic experiments, research prototypes, and architectural explorations in autonomous AI."
            className="mb-0"
          />
          <Link
            href="/ai-lab"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors self-start sm:self-end pb-2 group"
          >
            Explore All Experiments
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labExperiments.map((exp) => (
            <Card
              key={exp.id}
              hoverEffect
              className="flex flex-col justify-between border-[var(--border)] bg-[var(--card)] relative group"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                        <FlaskConical className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-xs text-[var(--foreground-muted)]">
                        {exp.category}
                      </span>
                    </div>
                    <Badge
                      variant={exp.badge === "Prototype" ? "accent" : "default"}
                      size="sm"
                      className="font-mono text-[10px]"
                    >
                      {exp.badge}
                    </Badge>
                  </div>

                  <CardTitle className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {exp.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="default" size="sm" className="font-mono text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="mt-4 pt-3 flex items-center justify-between font-mono text-xs">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {exp.status}
                </span>

                {exp.githubUrl && (
                  <a
                    href={exp.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
