"use client";

import * as React from "react";
import { Brain, Server, Database, Activity, Terminal, ArrowDown, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayerDetail {
  id: "ai" | "backend" | "db";
  title: string;
  badge: string;
  tech: string[];
  metrics: { label: string; val: string }[];
  description: string;
}

const layers: LayerDetail[] = [
  {
    id: "ai",
    title: "AI & REASONING LAYER",
    badge: "LLM / RAG / Multi-Agent",
    tech: ["LangChain", "Qdrant", "OpenAI / Claude", "Semantic Chunking"],
    metrics: [
      { label: "Precision", val: "96.4%" },
      { label: "Context Window", val: "128k Tokens" },
    ],
    description: "Multi-agent autonomous planning, embedding generation & hybrid reranked retrieval.",
  },
  {
    id: "backend",
    title: "BACKEND SERVICE LAYER",
    badge: "FastAPI / Python",
    tech: ["FastAPI", "AsyncIO", "Pydantic", "SSE Stream"],
    metrics: [
      { label: "Avg Latency", val: "18ms" },
      { label: "Concurrency", val: "10k req/s" },
    ],
    description: "High-throughput asynchronous API orchestration, JWT authentication & streaming endpoints.",
  },
  {
    id: "db",
    title: "STORAGE & VECTOR ENGINE",
    badge: "Qdrant / Postgres / Redis",
    tech: ["Qdrant Vector DB", "PostgreSQL", "Redis Cache", "HNSW Index"],
    metrics: [
      { label: "Vector Search", val: "<4ms" },
      { label: "Cache Hit Ratio", val: "94.2%" },
    ],
    description: "Distributed high-dimensional vector similarity indexing and transactional persistence.",
  },
];

export function SystemVisual() {
  const [activeLayer, setActiveLayer] = React.useState<"ai" | "backend" | "db">("ai");

  const current = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/60 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[var(--foreground-muted)] ml-2 flex items-center gap-1">
            <Terminal className="h-3 w-3 text-[var(--accent)]" />
            system_architecture.live
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
          <Activity className="h-3 w-3 animate-pulse" />
          <span className="hidden sm:inline">ONLINE</span>
          <span>99.99%</span>
        </div>
      </div>

      {/* Interactive System Flow Diagram */}
      <div className="flex flex-col gap-2.5">
        {/* Node 1: AI Layer */}
        <button
          type="button"
          onClick={() => setActiveLayer("ai")}
          className={cn(
            "w-full text-left p-3.5 rounded-[var(--radius-md)] border transition-all duration-200 cursor-pointer flex items-center justify-between group",
            activeLayer === "ai"
              ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-[0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-[var(--accent)]"
              : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-[var(--radius-sm)] transition-colors",
                activeLayer === "ai"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--card)] text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)]"
              )}
            >
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wide text-[var(--foreground)]">
                  AI & REASONING LAYER
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent-border)]">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-[var(--foreground-secondary)] font-mono">
                RAG • Embeddings • Agent Router
              </p>
            </div>
          </div>
          <Zap className={cn("h-4 w-4 transition-colors", activeLayer === "ai" ? "text-[var(--accent)]" : "text-[var(--foreground-muted)]")} />
        </button>

        {/* Data Flow Line 1 */}
        <div className="flex items-center justify-center py-0.5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--foreground-muted)]">
            <span className="h-4 w-[1px] bg-gradient-to-b from-[var(--accent)] to-emerald-400 animate-pulse" />
            <span className="text-[10px] tracking-wider uppercase text-[var(--accent)] flex items-center gap-1">
              <ArrowDown className="h-3 w-3 animate-bounce" />
              Async SSE / Token Stream
            </span>
            <span className="h-4 w-[1px] bg-gradient-to-b from-[var(--accent)] to-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Node 2: Backend Layer */}
        <button
          type="button"
          onClick={() => setActiveLayer("backend")}
          className={cn(
            "w-full text-left p-3.5 rounded-[var(--radius-md)] border transition-all duration-200 cursor-pointer flex items-center justify-between group",
            activeLayer === "backend"
              ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-[0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-[var(--accent)]"
              : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-[var(--radius-sm)] transition-colors",
                activeLayer === "backend"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--card)] text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)]"
              )}
            >
              <Server className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wide text-[var(--foreground)]">
                  BACKEND & API ENGINE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  FastAPI
                </span>
              </div>
              <p className="text-[11px] text-[var(--foreground-secondary)] font-mono">
                Python 3.12 • AsyncIO • REST • Auth
              </p>
            </div>
          </div>
          <ShieldCheck className={cn("h-4 w-4 transition-colors", activeLayer === "backend" ? "text-[var(--accent)]" : "text-[var(--foreground-muted)]")} />
        </button>

        {/* Data Flow Line 2 */}
        <div className="flex items-center justify-center py-0.5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--foreground-muted)]">
            <span className="h-4 w-[1px] bg-gradient-to-b from-emerald-400 to-indigo-400 animate-pulse" />
            <span className="text-[10px] tracking-wider uppercase text-emerald-400 flex items-center gap-1">
              <ArrowDown className="h-3 w-3 animate-bounce" />
              Vector Query / SQL Engine
            </span>
            <span className="h-4 w-[1px] bg-gradient-to-b from-emerald-400 to-indigo-400 animate-pulse" />
          </div>
        </div>

        {/* Node 3: Storage & Vector DB Layer */}
        <button
          type="button"
          onClick={() => setActiveLayer("db")}
          className={cn(
            "w-full text-left p-3.5 rounded-[var(--radius-md)] border transition-all duration-200 cursor-pointer flex items-center justify-between group",
            activeLayer === "db"
              ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-[0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-[var(--accent)]"
              : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-[var(--radius-sm)] transition-colors",
                activeLayer === "db"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--card)] text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)]"
              )}
            >
              <Database className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wide text-[var(--foreground)]">
                  STORAGE & VECTOR ENGINE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  HNSW Index
                </span>
              </div>
              <p className="text-[11px] text-[var(--foreground-secondary)] font-mono">
                Qdrant • PostgreSQL • Redis Cache
              </p>
            </div>
          </div>
          <CheckCircle2 className={cn("h-4 w-4 transition-colors", activeLayer === "db" ? "text-[var(--accent)]" : "text-[var(--foreground-muted)]")} />
        </button>
      </div>

      {/* Layer Detail Live Telemetry Inspector */}
      <div className="mt-4 pt-4 border-t border-[var(--border)] bg-[var(--background-secondary)]/80 rounded-[var(--radius-md)] p-3.5 border border-[var(--border-subtle)]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[11px] font-bold text-[var(--foreground)]">
            {current.title}
          </span>
          <span className="font-mono text-[10px] text-[var(--accent)] bg-[var(--accent-muted)] px-2 py-0.5 rounded">
            {current.badge}
          </span>
        </div>
        <p className="text-xs text-[var(--foreground-secondary)] mb-3 leading-relaxed">
          {current.description}
        </p>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-subtle)]">
          {current.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-[10px] font-mono text-[var(--foreground-muted)] uppercase">
                {m.label}
              </span>
              <span className="font-mono text-xs font-semibold text-[var(--foreground)]">
                {m.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
