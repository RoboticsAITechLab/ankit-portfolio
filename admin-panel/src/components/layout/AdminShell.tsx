"use client";

import * as React from "react";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Header */}
      <AdminHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex flex-row">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

