import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { skillCategories } from "@/data/skills";
import { Code2, Layout, Server, BrainCircuit, Check } from "lucide-react";

const icons = [Code2, Layout, Server, BrainCircuit];

export function TechStackSection() {
  return (
    <section id="stack" className="py-20 md:py-28 border-t border-[var(--border)] bg-[var(--background-secondary)]/50">
      <Container>
        <SectionHeading
          badge="CAPABILITIES"
          title="TECHNICAL STACK"
          description="Modern technologies, libraries, and frameworks used to architect and ship production systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = icons[idx % icons.length];

            return (
              <Card
                key={cat.title}
                hoverEffect
                className="flex flex-col justify-between border-[var(--border)] bg-[var(--card)]/90 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-2xl group-hover:bg-[var(--accent)]/10 transition-colors pointer-events-none" />

                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider">
                        0{idx + 1}
                      </span>
                    </div>
                    <CardTitle className="font-mono text-base tracking-wider text-[var(--foreground)]">
                      {cat.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {cat.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <ul className="space-y-2.5">
                      {cat.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="flex items-center justify-between font-mono text-xs text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-2 last:border-0 last:pb-0"
                        >
                          <span className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                            {skill.name}
                          </span>
                          {skill.level && (
                            <span className="text-[10px] text-[var(--foreground-muted)] uppercase">
                              {skill.level}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)]">
                  <span>Tested in Production</span>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
