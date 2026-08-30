import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "muted" | "accent";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border-default)]",
    accent: "bg-[var(--accent-soft)] text-[var(--accent-primary)] border-[var(--accent-border)]",
    success: "bg-[var(--status-success-soft)] text-[var(--status-success)] border-emerald-500/25",
    warning: "bg-[var(--status-warning-soft)] text-[var(--status-warning)] border-amber-500/25",
    error: "bg-[var(--status-error-soft)] text-[var(--status-error)] border-red-500/25",
    info: "bg-[var(--status-info-soft)] text-[var(--status-info)] border-sky-500/25",
    muted: "bg-[var(--surface-hover)] text-[var(--text-muted)] border-[var(--border-subtle)]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono font-medium rounded-[var(--radius-sm)] border leading-none tracking-wide select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const getStatusConfig = (s: string) => {
    switch (s) {
      case "Published":
      case "Production-Ready":
        return {
          variant: "success" as const,
          dot: "bg-emerald-400",
        };
      case "Draft":
      case "Prototype":
      case "Experiment":
      case "In Development":
        return {
          variant: "info" as const,
          dot: "bg-sky-400",
        };
      case "Unread":
        return {
          variant: "accent" as const,
          dot: "bg-sky-400 animate-pulse",
        };
      case "Coming Soon":
      case "Warning":
        return {
          variant: "warning" as const,
          dot: "bg-amber-400",
        };
      case "Archived":
      case "Read":
        return {
          variant: "muted" as const,
          dot: "bg-zinc-500",
        };
      default:
        return {
          variant: "default" as const,
          dot: "bg-zinc-400",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} size="sm">
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.dot)} />
      <span>{status}</span>
    </Badge>
  );
}
