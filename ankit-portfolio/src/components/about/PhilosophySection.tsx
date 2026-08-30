import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Quote, ArrowRight } from "lucide-react";

export function PhilosophySection() {
  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background-secondary)]/30">
      {/* Background Subtle Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[260px] bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Section Heading Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-8">
            <Quote className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">
              DEVELOPMENT PHILOSOPHY
            </span>
          </div>

          {/* Core Philosophy Quote */}
          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight mb-12 sm:px-6">
            &ldquo;Use AI for implementation speed. Keep architecture, security, decisions and quality under engineering control.&rdquo;
          </blockquote>

          {/* Final Clean CTA */}
          <div className="flex justify-center">
            <Link href="/projects">
              <Button size="lg" variant="primary" className="font-mono text-sm gap-2">
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
