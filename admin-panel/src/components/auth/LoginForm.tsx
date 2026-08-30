"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import { adminLogin, setAuthToken } from "@/lib/api";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await adminLogin(email.trim(), password.trim());
      setIsLoading(false);

      if (response.success && response.data?.token) {
        setAuthToken(response.data.token);
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        setError(response.message || "Invalid email or password.");
      }
    } catch (_err) {
      setIsLoading(false);
      setError("Failed to connect to backend server.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border-strong)] bg-[var(--surface-card)] shadow-2xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--accent-primary)] mb-2">
          <ShieldIcon className="h-3.5 w-3.5" />
          <span>AUTHENTICATION</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
          ADMIN LOGIN
        </h1>
        <p className="text-xs font-mono text-[var(--text-secondary)]">
          Enter credentials to access the portfolio control center
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/25 text-red-400 font-mono text-xs flex items-center gap-2">
            <AlertTriangleIcon className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs flex items-center gap-2">
            <CheckIcon className="h-4 w-4 shrink-0" />
            <span>Authenticated successfully. Redirecting...</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="admin@example.com"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter password"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading || isSuccess}
            className="w-full justify-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Signing In...</span>
              </span>
            ) : isSuccess ? (
              <span>Success!</span>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

