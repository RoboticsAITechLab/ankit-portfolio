
import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TechnicalFocusSection() {
  const categories = [
    "AI / ML",
    "FULL-STACK",
    "BACKEND",
    "DATA",
    "ARCHITECTURE",
  ];

  const focusAreas = [
    "AI-assisted development",
    "APIs",
    "Authentication",
    "Databases",
    "System Design",
    "Testing",
  ];

  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        <SectionHeading
          badge="COMPETENCY MATRIX"
          title="TECHNICAL FOCUS"
          description="Core domains and architectural disciplines practiced in engineering systems."
        />

        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12 md:p-16">
          {/* Top Categories Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pb-10 sm:pb-12 border-b border-[var(--border)]">
            {categories.map((cat, idx) => (
              <div key={cat} className="flex flex-col items-center text-center">
                <span className="font-mono text-[11px] text-[var(--accent)] mb-1">
                  {"//"} 0{idx + 1}
                </span>
                <span className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-wider text-[var(--foreground)]">
                  {cat}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Execution Disciplines Row */}
          <div className="pt-10 sm:pt-12">
            <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-3 sm:gap-x-6 text-xs sm:text-sm md:text-base font-mono text-[var(--foreground-secondary)] text-center">
              {focusAreas.map((item, idx) => (
                <React.Fragment key={item}>
                  <span className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                    {item}
                  </span>
                  {idx < focusAreas.length - 1 && (
                    <span className="text-[var(--accent)] select-none">
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
