"use client";

import * as React from "react";
import { AdminProfile, PortfolioLinks, SystemPreferences } from "@/types";
import {
  initialProfile,
  initialPortfolioLinks,
  initialPreferences,
} from "@/data/settings";
import { Button } from "@/components/ui/Button";
import { CheckIcon, UserIcon, ExternalLinkIcon, SettingsIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function SettingsClient() {
  const [profile, setProfile] = React.useState<AdminProfile>(initialProfile);
  const [links, setLinks] = React.useState<PortfolioLinks>(initialPortfolioLinks);
  const [preferences, setPreferences] = React.useState<SystemPreferences>(initialPreferences);

  const [notification, setNotification] = React.useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showFeedback("Profile details saved locally.");
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    showFeedback("Portfolio link endpoints updated locally.");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    showFeedback("System preferences saved locally.");
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. PAGE HEADER */}
      <div className="pb-4 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
            SETTINGS
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mt-1">
            Manage application and portfolio configuration
          </p>
        </div>

        {notification && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs animate-fadeIn">
            <CheckIcon className="h-4 w-4" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* SECTION 1: PROFILE */}
        <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)] font-mono">
            <UserIcon className="h-4 w-4 text-[var(--accent-primary)]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Profile
            </h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
                  Role
                </label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* SECTION 2: PORTFOLIO LINKS */}
        <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)] font-mono">
            <ExternalLinkIcon className="h-4 w-4 text-[var(--accent-primary)]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Portfolio Links
            </h2>
          </div>

          <form onSubmit={handleSaveLinks} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={links.github}
                  onChange={(e) =>
                    setLinks((prev) => ({ ...prev, github: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={links.linkedin}
                  onChange={(e) =>
                    setLinks((prev) => ({ ...prev, linkedin: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
                  Portfolio Domain
                </label>
                <input
                  type="text"
                  value={links.portfolioUrl}
                  onChange={(e) =>
                    setLinks((prev) => ({ ...prev, portfolioUrl: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* SECTION 3: SYSTEM PREFERENCES */}
        <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)] font-mono">
            <SettingsIcon className="h-4 w-4 text-[var(--accent-primary)]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              System Preferences
            </h2>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div className="space-y-3 font-mono text-xs">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">Dark Mode Theme</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Universal technical dark palette across all admin workspaces
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, darkMode: !prev.darkMode }))
                  }
                  className={cn(
                    "px-3 py-1.5 rounded font-bold transition-colors cursor-pointer",
                    preferences.darkMode
                      ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)]"
                      : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
                  )}
                >
                  {preferences.darkMode ? "ON" : "OFF"}
                </button>
              </div>

              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">Email Notifications</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Forward new contact form inquiries to administrator inbox
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      emailNotifications: !prev.emailNotifications,
                    }))
                  }
                  className={cn(
                    "px-3 py-1.5 rounded font-bold transition-colors cursor-pointer",
                    preferences.emailNotifications
                      ? "bg-emerald-500 text-black"
                      : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
                  )}
                >
                  {preferences.emailNotifications ? "ON" : "OFF"}
                </button>
              </div>

              {/* Maintenance Mode Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">Maintenance Mode</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Temporarily render public portfolio under maintenance state
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      maintenanceMode: !prev.maintenanceMode,
                    }))
                  }
                  className={cn(
                    "px-3 py-1.5 rounded font-bold transition-colors cursor-pointer",
                    preferences.maintenanceMode
                      ? "bg-amber-500 text-black"
                      : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
                  )}
                >
                  {preferences.maintenanceMode ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Preferences
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
