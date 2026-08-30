import * as React from "react";
import { ProjectArchitecture } from "@/types";
import { ArrowRight, ArrowDown, Server, Database, Brain, Layout, Cpu } from "lucide-react";

interface CaseStudyArchitectureProps {
  architecture: ProjectArchitecture;
}

export function CaseStudyArchitecture({ architecture }: CaseStudyArchitectureProps) {
  const getIconForNode = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("ai") || lower.includes("retrieval") || lower.includes("embed")) {
      return Brain;
    }
    if (lower.includes("db") || lower.includes("store") || lower.includes("storage")) {
      return Database;
    }
    if (lower.includes("client") || lower.includes("frontend") || lower.includes("ui")) {
      return Layout;
    }
    if (lower.includes("engine") || lower.includes("sandbox") || lower.includes("runtime")) {
      return Cpu;
    }
    return Server;
  };

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 md:p-10">
      {architecture.summary && (
        <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-8 max-w-3xl">
          {architecture.summary}
        </p>
      )}

      {/* Connected Architecture Flow: Desktop Horizontal / Mobile Vertical */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-2">
        {architecture.nodes.map((node, index) => {
          const Icon = getIconForNode(node.name);
          const isLast = index === architecture.nodes.length - 1;

          return (
            <React.Fragment key={node.name}>
              {/* Node Card */}
              <div className="w-full lg:flex-1 p-4 sm:p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-[var(--radius-sm)] bg-[var(--card)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] text-[var(--foreground-muted)] uppercase">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h4 className="font-mono text-xs sm:text-sm font-bold text-[var(--foreground)] tracking-wide mb-1">
                    {node.name}
                  </h4>
                  <p className="text-xs text-[var(--foreground-secondary)] leading-tight mb-2">
                    {node.role}
                  </p>
                </div>

                {node.tech && (
                  <div className="pt-2 border-t border-[var(--border-subtle)] mt-2">
                    <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                      {node.tech}
                    </span>
                  </div>
                )}
              </div>

              {/* Directional Connector Arrow */}
              {!isLast && (
                <div className="flex items-center justify-center my-1 lg:my-0 lg:px-1 text-[var(--accent)] shrink-0">
                  <ArrowDown className="h-4 w-4 lg:hidden animate-pulse" />
                  <ArrowRight className="hidden lg:block h-4 w-4 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
