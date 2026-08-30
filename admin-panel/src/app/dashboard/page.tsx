import * as React from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import {
  FolderIcon,
  AwardIcon,
  BotIcon,
  MailIcon,
  BarChartIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { initialProjects } from "@/data/projects";
import { initialCertifications } from "@/data/certifications";
import { initialAiExperiments } from "@/data/aiLab";
import { initialMessages } from "@/data/messages";

export const metadata = {
  title: "Dashboard | Admin Panel",
  description: "Portfolio administration and operations overview",
};

export default function DashboardPage() {
  const unreadMessagesCount = initialMessages.filter((m) => m.status === "Unread").length;

  const quickCards = [
    {
      title: "Projects",
      count: initialProjects.length,
      detail: `${initialProjects.filter((p) => p.status === "Published").length} Published`,
      href: "/projects",
      icon: FolderIcon,
      accent: "text-sky-400",
    },
    {
      title: "Certifications",
      count: initialCertifications.length,
      detail: `${initialCertifications.filter((c) => c.status === "Published").length} Verified`,
      href: "/certifications",
      icon: AwardIcon,
      accent: "text-emerald-400",
    },
    {
      title: "AI Lab",
      count: initialAiExperiments.length,
      detail: "Active Experiments",
      href: "/ai-lab",
      icon: BotIcon,
      accent: "text-purple-400",
    },
    {
      title: "Messages",
      count: initialMessages.length,
      detail: `${unreadMessagesCount} Unread enquiries`,
      href: "/messages",
      icon: MailIcon,
      accent: "text-amber-400",
    },
  ];

  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <div className="space-y-8">
            {/* Page Header */}
            <div className="pb-4 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
                  DASHBOARD
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] mt-1">
                  Portfolio administration and system status
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-default)] font-mono text-xs text-[var(--text-secondary)] self-start sm:self-auto">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>System Online • v1.0.0</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="p-5 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        {card.title}
                      </span>
                      <Icon className={`h-4 w-4 ${card.accent}`} />
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                        {card.count}
                      </span>
                      <ArrowUpRightIcon className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <p className="font-mono text-[11px] text-[var(--text-secondary)] mt-2">
                      {card.detail}
                    </p>
                  </Link>
                );
              })}
            </div>

            {/* Quick Navigation Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity / System Notes */}
              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <h3 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                    PORTFOLIO REPOSITORY HEALTH
                  </h3>
                  <span className="font-mono text-xs text-[var(--status-success)] flex items-center gap-1">
                    <CheckIcon className="h-3.5 w-3.5" /> Synchronized
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center justify-between p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)]">
                    <span>9 Codingal Certificates Verified</span>
                    <span className="text-[var(--text-muted)]">PDFs Linked</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)]">
                    <span>Public GitHub Profile</span>
                    <span className="text-[var(--accent-primary)]">RoboticsAITechLab</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)]">
                    <span>Primary Contact Inquiries</span>
                    <span className="text-[var(--text-muted)]">Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Jump Modules */}
              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <h3 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                    ADMIN SHORTCUTS
                  </h3>
                  <BarChartIcon className="h-4 w-4 text-[var(--text-muted)]" />
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <Link
                    href="/analytics"
                    className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    View Traffic & Stats →
                  </Link>
                  <Link
                    href="/messages"
                    className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    Open Messages Inbox →
                  </Link>
                  <Link
                    href="/ai-lab"
                    className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    Manage AI Lab →
                  </Link>
                  <Link
                    href="/settings"
                    className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    Configure Settings →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </AdminShell>
  );
}
