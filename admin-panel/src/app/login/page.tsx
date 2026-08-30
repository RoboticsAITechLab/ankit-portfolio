import * as React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Admin Login | Admin Panel",
  description: "Sign in to portfolio management portal",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[var(--bg-primary)]">
      {/* Brand Watermark */}
      <div className="mb-6 text-center">
        <Link
          href="/"
          className="font-mono font-bold text-base tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center justify-center gap-2"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span>ANKIT ADMIN</span>
        </Link>
      </div>

      <LoginForm />
    </main>
  );
}
