import * as React from "react";
import Link from "next/link";
import { AiExperiment, AiExperimentStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, Beaker, Clock, CheckCircle2, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiExperimentCardProps {
  experiment: AiExperiment;
}

function getStatusBadgeVariant(status: AiExperimentStatus) {
  switch (status) {
    case "Prototype":
      return "accent";
    case "Experiment":
      return "default";
    case "In Development":
      return "outline";
    case "Production-Ready":
      return "accent";
    case "Coming Soon":
      return "muted";
    default:
      return "default";
  }
}

function StatusBadgeIcon({ status }: { status: AiExperimentStatus }) {
  switch (status) {
    case "Prototype":
      return <Beaker className="h-3 w-3" />;
    case "Experiment":
      return <GitBranch className="h-3 w-3" />;
    case "In Development":
      return <Clock className="h-3 w-3" />;
    case "Production-Ready":
      return <CheckCircle2 className="h-3 w-3" />;
    case "Coming Soon":
      return <Sparkles className="h-3 w-3" />;
    default:
      return <Beaker className="h-3 w-3" />;
  }
}

export function AiExperimentCard({ experiment }: AiExperimentCardProps) {
  const isComingSoon = experiment.isComingSoon || experiment.status === "Coming Soon";

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)] group relative overflow-hidden",
        isComingSoon && "border-dashed opacity-85 hover:opacity-100"
      )}
    >
      <div>
        {/* Top Meta Row: Number & Status Badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-sm font-bold text-[var(--accent)] px-2.5 py-1 rounded bg-[var(--accent-muted)] border border-[var(--accent-border)]">
            {experiment.number}
          </span>

          <Badge
            variant={getStatusBadgeVariant(experiment.status)}
            size="sm"
            className="font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5"
          >
            <StatusBadgeIcon status={experiment.status} />
            {experiment.status}
          </Badge>
        </div>

        {/* Experiment Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1.5 font-mono">
          {experiment.title}
        </h3>

        {/* Subtitle / Focus */}
        {experiment.subtitle && (
          <p className="font-mono text-xs text-[var(--accent)] mb-4">
            {experiment.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6">
          {experiment.description}
        </p>

        {/* Technology Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {experiment.technologies.map((tech) => (
            <Badge key={tech} variant="default" size="sm" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-4 mt-auto border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs sm:text-sm">
        {experiment.href && !isComingSoon ? (
          <Link
            href={experiment.href}
            className="inline-flex items-center gap-1.5 font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group/link"
          >
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <span className="font-mono text-xs text-[var(--foreground-muted)] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            Active Research Pipeline
          </span>
        )}

        <span className="text-[10px] uppercase font-mono text-[var(--foreground-muted)]">
          {isComingSoon ? "Planned" : "Lab Sandbox"}
        </span>
      </div>
    </div>
  );
}
