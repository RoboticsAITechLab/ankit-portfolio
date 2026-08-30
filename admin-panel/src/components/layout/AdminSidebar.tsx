"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  FolderIcon,
  AwardIcon,
  BotIcon,
  MailIcon,
  BarChartIcon,
  SettingsIcon,
  LogOutIcon,
  XIcon,
} from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/projects", label: "Projects", icon: FolderIcon },
  { href: "/certifications", label: "Certifications", icon: AwardIcon },
  { href: "/ai-lab", label: "AI Lab", icon: BotIcon },
  { href: "/messages", label: "Messages", icon: MailIcon },
  { href: "/analytics", label: "Analytics", icon: BarChartIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 font-mono text-xs select-none">
      {/* Top Nav Items */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase mb-1">
          Navigation
        </div>

        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-colors group relative",
                isActive
                  ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-semibold border border-[var(--border-default)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card)]"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r bg-[var(--accent-primary)]" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive
                    ? "text-[var(--accent-primary)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Nav Items */}
      <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1">
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-56 lg:w-64 border-r border-[var(--border-default)] bg-[var(--bg-secondary)] min-h-[calc(100vh-3.5rem)] shrink-0">
        {navContent}
      </aside>

      {/* 2. Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Window */}
          <div className="relative w-64 max-w-[80vw] h-full bg-[var(--bg-secondary)] border-r border-[var(--border-strong)] z-10 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
              <span className="font-mono font-bold text-sm text-[var(--text-primary)]">
                ANKIT ADMIN
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}
    </>
  );
}
