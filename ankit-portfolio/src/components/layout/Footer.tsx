import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { Mail, Cpu, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background-secondary)] pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border)]">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 flex flex-col">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-[var(--foreground)] mb-4"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--accent)]">
                <Cpu className="h-4 w-4" />
              </span>
              <span className="font-bold text-base tracking-tight">ANKIT KUMAR</span>
            </Link>
            <p className="font-mono text-xs text-[var(--accent)] mb-3 uppercase tracking-wider">
              AI & Software Developer
            </p>
            <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed max-w-sm mb-6">
              Engineering reliable, scalable, and intelligent software systems with Next.js, Python, FastAPI, and generative AI.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 self-start">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for full-time & consulting roles
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm font-mono text-[var(--foreground-secondary)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[var(--accent)] transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/ai-lab" className="hover:text-[var(--accent)] transition-colors">
                  AI Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect Links */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-mono text-[var(--foreground-secondary)]">
              <li>
                <a
                  href="https://github.com/RoboticsAITechLab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors group"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ankitkumar-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors group"
                >
                  <LinkedinIcon className="h-3.5 w-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:roboticsaitechlab@gmail.com"
                  className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors group"
                >
                  <Mail className="h-3.5 w-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                  <span>Email</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ankitkumar_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors group"
                >
                  <TwitterIcon className="h-3.5 w-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                  <span>X / Twitter</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--foreground-muted)]">
          <p>© {currentYear} Ankit Kumar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with Next.js & TypeScript</span>
            <span className="h-3 w-[1px] bg-[var(--border)]" />
            <span className="text-[var(--foreground-secondary)]">Dark Mode Technical Architecture</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
