import * as React from "react";
import { contactInfo } from "@/data/contact";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, ArrowUpRight, Globe } from "lucide-react";

export function ContactLinks() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Contact Channels Card */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 md:p-10 shadow-lg">
        <div className="mb-6 pb-4 border-b border-[var(--border-subtle)]">
          <h3 className="font-mono text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
            LET&apos;S CONNECT
          </h3>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] font-mono mt-1">
            Primary communication and network channels
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Channel */}
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center justify-between p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-border)] hover:bg-[var(--surface)]/90 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--card)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-[var(--foreground-muted)] tracking-wider">
                  Email
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {contactInfo.email}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* GitHub Channel */}
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-border)] hover:bg-[var(--surface)]/90 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--card)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                <GithubIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-[var(--foreground-muted)] tracking-wider">
                  GitHub
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {contactInfo.githubHandle}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* LinkedIn Channel */}
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-border)] hover:bg-[var(--surface)]/90 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--card)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                <LinkedinIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-[var(--foreground-muted)] tracking-wider">
                  LinkedIn
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {contactInfo.linkedinHandle}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Location & Availability Card */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-lg mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-[var(--accent)]" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            LOCATION / AVAILABILITY
          </h4>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border border-emerald-500/20 bg-emerald-500/5">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs sm:text-sm font-medium text-[var(--foreground)]">
            {contactInfo.availability}
          </span>
        </div>
      </div>
    </div>
  );
}
