import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DeveloperProfileVisual } from "@/components/about/DeveloperProfileVisual";
import { HowIWorkSection } from "@/components/about/HowIWorkSection";
import { TechnicalFocusSection } from "@/components/about/TechnicalFocusSection";
import { PhilosophySection } from "@/components/about/PhilosophySection";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Ankit Kumar | AI & Software Developer",
  description:
    "Learn about Ankit Kumar's engineering background, workflow methodology, technical focus, and development philosophy.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1 — ABOUT HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 bg-grid-subtle">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-6 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase">
                  ABOUT ME
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.08] mb-6">
                AI & SOFTWARE <br />
                <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                  DEVELOPER
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] leading-relaxed max-w-2xl mb-8">
                I build software systems with a focus on architecture, AI and production implementation.
              </p>

              {/* Action CTA */}
              <div className="flex items-center gap-4">
                <Link href="/projects">
                  <Button size="lg" variant="primary" className="font-mono text-sm gap-2">
                    View My Work
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Developer Profile Visual */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <DeveloperProfileVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — HOW I WORK */}
      <HowIWorkSection />

      {/* SECTION 3 — TECHNICAL FOCUS */}
      <TechnicalFocusSection />

      {/* SECTION 4 & 5 — DEVELOPMENT PHILOSOPHY & FINAL CTA */}
      <PhilosophySection />
    </div>
  );
}
