import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "muted";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono font-medium transition-colors select-none";

  const variantStyles = {
    default:
      "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]",
    accent:
      "bg-[var(--accent-muted)] text-[var(--accent-hover)] border border-[var(--accent-border)]",
    outline:
      "bg-transparent text-[var(--foreground-secondary)] border border-[var(--border)]",
    muted:
      "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] border border-transparent",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded-[var(--radius-sm)] gap-1.5",
    md: "text-xs px-2.5 py-1 rounded-[var(--radius-sm)] gap-2",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "accent" ? "bg-[var(--accent)]" : "bg-[var(--foreground-muted)]"
          )}
        />
      )}
      {children}
    </span>
  );
}
