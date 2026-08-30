import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Compass, Hammer, Shield, Rocket, CheckCircle2 } from "lucide-react";

export function HowIWorkSection() {
  const steps = [
    {
      number: "01",
      title: "ARCHITECT",
      icon: Compass,
      items: ["Requirements", "System design", "Architecture"],
    },
    {
      number: "02",
      title: "BUILD",
      icon: Hammer,
      items: ["AI-assisted implementation", "Integration", "Engineering execution"],
    },
    {
      number: "03",
      title: "SECURE",
      icon: Shield,
      items: ["Security review", "Validation", "Testing"],
    },
    {
      number: "04",
      title: "SHIP",
      icon: Rocket,
      items: ["Testing", "Deployment", "Monitoring"],
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)] bg-[var(--background-secondary)]/40">
      <Container>
        <SectionHeading
          badge="PROCESS & DISCIPLINE"
          title="HOW I WORK"
          description="From architecture to production, every stage stays under engineering control."
        />

        <div className="space-y-6">
          {/* First Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.slice(0, 3).map((step) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.number}
                  hoverEffect
                  className="flex flex-col justify-between border-[var(--border)] bg-[var(--card)] p-6 md:p-8 relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded border border-[var(--accent-border)]">
                        {step.number}
                      </span>
                      <span className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="font-mono text-lg font-bold text-[var(--foreground)] tracking-wider mb-4">
                      {step.title}
                    </h3>

                    <ul className="space-y-3 font-mono text-xs sm:text-sm text-[var(--foreground-secondary)]">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Second Row: Centered 4th Card (SHIP) */}
          <div className="max-w-md mx-auto">
            {(() => {
              const step = steps[3];
              const Icon = step.icon;

              return (
                <Card
                  hoverEffect
                  className="flex flex-col justify-between border-[var(--border)] bg-[var(--card)] p-6 md:p-8 relative group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded border border-[var(--accent-border)]">
                        {step.number}
                      </span>
                      <span className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="font-mono text-lg font-bold text-[var(--foreground)] tracking-wider mb-4">
                      {step.title}
                    </h3>

                    <ul className="space-y-3 font-mono text-xs sm:text-sm text-[var(--foreground-secondary)]">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })()}
          </div>
        </div>
      </Container>
    </section>
  );
}
