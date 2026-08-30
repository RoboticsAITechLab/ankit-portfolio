import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="relative z-10 rounded-[var(--radius-xl)] border border-[var(--border)] bg-gradient-to-b from-[var(--surface-elevated)]/80 to-[var(--card)]/90 backdrop-blur-xl p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--accent-muted)] border border-[var(--accent-border)] mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold text-[var(--accent-hover)] uppercase tracking-wider">
              Let&apos;s Build Together
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight mb-6">
            READY TO ARCHITECT AND SHIP YOUR NEXT INTELLIGENT PRODUCT?
          </h2>

          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you need a production RAG system, an autonomous agent pipeline, or high-performance full-stack web applications, let&apos;s engineer something extraordinary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto font-mono text-sm gap-2">
                <MessageSquare className="h-4 w-4" />
                Start a Conversation
              </Button>
            </Link>
            <Link href="/projects" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto font-mono text-sm gap-2">
                Explore Work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
