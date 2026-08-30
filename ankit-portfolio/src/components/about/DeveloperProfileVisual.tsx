"use client";

import * as React from "react";
import { Brain, Code2, Database, ShieldCheck, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeveloperProfileVisual() {
  const [activePillar, setActivePillar] = React.useState<"ai" | "software" | "data">("ai");

  const pillars = [
    {
      id: "ai" as const,
      label: "AI",
      fullName: "AI SYSTEMS",
      icon: Brain,
      color: "var(--accent)",
      details: ["RAG Architecture", "Autonomous Logic", "Model Integration"],
    },
    {
      id: "software" as const,
      label: "SOFTWARE",
      fullName: "SYSTEMS & CODE",
      icon: Code2,
      color: "#38bdf8",
      details: ["Full-Stack Engineering", "Strict Typing", "Robust APIs"],
    },
    {
      id: "data" as const,
      label: "DATA",
      fullName: "DATA & VECTORS",
      icon: Database,
      color: "#818cf8",
      details: ["Vector Embeddings", "Storage Systems", "Pipeline Execution"],
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-black/70 overflow-hidden">
      {/* Background Ambient Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--foreground-muted)] uppercase tracking-wider">
            DEVELOPER PROFILE
          </span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          PRODUCTION FOCUS
        </span>
      </div>

      {/* 3 Interactive Pillar Nodes */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {pillars.map((p) => {
          const Icon = p.icon;
          const isActive = activePillar === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePillar(p.id)}
              className={cn(
                "flex flex-col items-center text-center p-3.5 rounded-[var(--radius-md)] border transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-[0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-[var(--accent)]"
                  : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
              )}
            >
              <div
                className={cn(
                  "p-2.5 rounded-[var(--radius-sm)] mb-2 transition-colors",
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                    : "bg-[var(--card)] text-[var(--foreground-secondary)]"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs font-bold text-[var(--foreground)] tracking-wider">
                {p.label}
              </span>
              <span className="text-[10px] text-[var(--foreground-muted)] font-mono mt-0.5">
                ●
              </span>
            </button>
          );
        })}
      </div>

      {/* Central Architecture Inspection View */}
      <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--background-secondary)]/80 p-4 font-mono">
        <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]">
            <Cpu className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>
              {pillars.find((p) => p.id === activePillar)?.fullName}
            </span>
          </div>
          <span className="text-[10px] text-[var(--accent)] bg-[var(--accent-muted)] px-2 py-0.5 rounded">
            Engineering Pillar
          </span>
        </div>

        <ul className="space-y-2 text-xs text-[var(--foreground-secondary)]">
          {pillars
            .find((p) => p.id === activePillar)
            ?.details.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Footer Metrics Row */}
      <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)]">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          Architecture & Security Control
        </span>
        <span className="text-[var(--accent)]">Production-Grade</span>
      </div>
    </div>
  );
}
