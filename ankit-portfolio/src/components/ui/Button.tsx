import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold hover:bg-[var(--accent-hover)] shadow-sm hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]",
      secondary:
        "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-hover)]",
      ghost:
        "bg-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]",
      outline:
        "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-muted)]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
      md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
      lg: "h-12 px-6 text-base rounded-[var(--radius-md)]",
      icon: "h-10 w-10 p-0 rounded-[var(--radius-md)]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
