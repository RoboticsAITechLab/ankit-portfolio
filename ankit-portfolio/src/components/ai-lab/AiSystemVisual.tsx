"use client";

import * as React from "react";
import { ArrowRight, ArrowDown, Cpu, Terminal, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemStage {
  step: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  description: string;
}

const stages: SystemStage[] = [
  {
    step: "01",
    name: "INPUT",
    subtitle: "Raw Context Ingestion",
    icon: FileCode,
    tags: ["Documents", "Queries", "Telemetry"],
    description: "Multimodal ingestion, tokenization, semantic chunking, and metadata parsing.",
  },
  {
    step: "02",
    name: "REASON",
    subtitle: "Inference & Graph Evaluation",
    icon: Cpu,
    tags: ["Dense Vectors", "Agent Graphs", "Self-Correction"],
    description: "Vector similarity retrieval, cross-encoder ranking, and tool orchestration in isolated loops.",
  },
  {
    step: "03",
    name: "OUTPUT",
    subtitle: "Deterministic Delivery",
    icon: Terminal,
    tags: ["Streaming SSE", "Structured JSON", "Action Execution"],
    description: "Low-latency streaming responses with source attribution and deterministic payload validation.",
  },
];

export function AiSystemVisual() {
  const [activeStage, setActiveStage] = React.useState<number>(1);

  return (
    <div className="w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 md:p-10 mb-16 md:mb-24 relative overflow-hidden">
      {/* Background Ambience & Subtle Grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Visual Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[var(--border-subtle)]">
        <div>
          <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider block mb-1">
            CORE ARCHITECTURAL PARADIGM
          </span>
          <h3 className="font-mono text-base sm:text-lg font-bold text-[var(--foreground)] tracking-tight">
            INPUT → REASON → OUTPUT
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground-muted)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Inference Cycle</span>
        </div>
      </div>

      {/* 3-Stage Connected Pipeline: Desktop Horizontal / Mobile Vertical */}
      <div
        role="region"
        aria-label="AI System Architecture Stages"
        className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch"
      >
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStage === idx;
          const isLast = idx === stages.length - 1;

          return (
            <div key={stage.name} className="relative flex flex-col">
              {/* Card Container */}
              <div
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActiveStage(idx)}
                onFocus={() => setActiveStage(idx)}
                className={cn(
                  "flex-1 p-5 sm:p-6 rounded-[var(--radius-lg)] border transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isActive
                    ? "bg-[var(--surface)] border-[var(--accent)] shadow-[0_0_24px_rgba(14,165,233,0.15)]"
                    : "bg-[var(--surface)]/60 border-[var(--border)] hover:border-[var(--border-hover)]"
                )}
              >
                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "p-2.5 rounded-[var(--radius-md)] border transition-colors",
                        isActive
                          ? "bg-[var(--accent-muted)] border-[var(--accent-border)] text-[var(--accent)]"
                          : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)]"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--foreground-muted)]">
                      {stage.step}
                    </span>
                  </div>

                  <h4 className="font-mono text-base font-bold text-[var(--foreground)] tracking-wide mb-1">
                    {stage.name}
                  </h4>
                  <p className="font-mono text-xs text-[var(--accent)] mb-3">
                    {stage.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed mb-4">
                    {stage.description}
                  </p>
                </div>

                {/* Card Bottom Tags */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5 mt-auto">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Directional Connector Arrow between stages (Desktop) */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="hidden lg:flex absolute -right-4.5 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-[var(--card)] border border-[var(--border)] items-center justify-center text-[var(--accent)] shadow-md"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}

              {/* Directional Connector Arrow between stages (Mobile) */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="lg:hidden flex items-center justify-center py-2 text-[var(--accent)]"
                >
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Screen Reader Semantic Summary */}
      <div className="sr-only">
        AI System flow consists of three stages: Input (Raw Context Ingestion), Reason (Inference and Graph Evaluation), and Output (Deterministic Delivery).
      </div>
    </div>
  );
}
