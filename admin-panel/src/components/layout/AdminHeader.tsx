"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDownIcon, MenuIcon, UserIcon, LogOutIcon } from "@/components/ui/Icons";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOutsideClick = () => setIsDropdownOpen(false);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-14 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            aria-label="Toggle navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        )}

        <Link
          href="/dashboard"
          className="font-mono font-bold text-sm tracking-wider text-[var(--text-primary)] flex items-center gap-2 select-none hover:text-[var(--accent-primary)] transition-colors"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span>ANKIT ADMIN</span>
        </Link>
      </div>

      {/* Right: Admin User Profile Dropdown */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--radius-md)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-transparent hover:border-[var(--border-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
          aria-expanded={isDropdownOpen}
        >
          <div className="h-6 w-6 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[var(--accent-primary)]">
            <UserIcon className="h-3.5 w-3.5" />
          </div>
          <span className="hidden sm:inline font-medium">Admin User</span>
          <ChevronDownIcon className="h-3.5 w-3.5 opacity-70" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-11 w-48 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-card)] p-1.5 shadow-2xl z-50 font-mono text-xs text-left">
            <div className="px-3 py-2 border-b border-[var(--border-subtle)] mb-1">
              <p className="text-[var(--text-primary)] font-semibold truncate">Ankit Kumar</p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">roboticsaitechlab@gmail.com</p>
            </div>

            <Link
              href="/settings"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <UserIcon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Profile Settings</span>
            </Link>

            <div className="h-[1px] bg-[var(--border-subtle)] my-1" />

            <Link
              href="/login"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-red-500/15 text-red-400 transition-colors"
            >
              <LogOutIcon className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
