import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SystemVisual } from "@/components/sections/SystemVisual";
import { ArrowRight, MessageSquare, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 bg-grid-subtle">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-medium tracking-wide text-[var(--foreground)] uppercase">
                AVAILABLE FOR ENGINEERING PROJECTS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.08] mb-6">
              AI & SOFTWARE <br />
              <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                DEVELOPER
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] leading-relaxed max-w-2xl mb-8">
              I design, build and ship intelligent digital products using{" "}
              <span className="text-[var(--foreground)] font-medium">AI</span>,{" "}
              <span className="text-[var(--foreground)] font-medium">Python</span>,{" "}
              <span className="text-[var(--foreground)] font-medium">data</span>, and{" "}
              <span className="text-[var(--foreground)] font-medium">modern web technologies</span>.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto font-mono text-sm gap-2">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-mono text-sm gap-2">
                  <MessageSquare className="h-4 w-4 text-[var(--accent)]" />
                  Let&apos;s Talk
                </Button>
              </Link>
            </div>

            {/* Core Competencies Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-6 border-t border-[var(--border)] w-full">
              <Badge variant="default" size="md" className="font-mono text-xs gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                AI Systems
              </Badge>
              <Badge variant="default" size="md" className="font-mono text-xs gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Full-Stack
              </Badge>
              <Badge variant="default" size="md" className="font-mono text-xs gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Architecture
              </Badge>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-[var(--foreground-muted)] ml-auto">
                <Terminal className="h-3.5 w-3.5" />
                Production Ready
              </span>
            </div>
          </div>

          {/* Right Column: System / AI Visual */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <SystemVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
