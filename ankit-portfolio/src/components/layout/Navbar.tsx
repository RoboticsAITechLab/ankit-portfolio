"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "EXJET UI", href: "/typography" },
  { name: "Certifications", href: "/certifications" },
  { name: "AI Lab", href: "/ai-lab" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md transition-all">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:shadow-[0_0_12px_rgba(14,165,233,0.3)] transition-all">
            <Cpu className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              ANKIT KUMAR
            </span>
            <span className="text-[10px] text-[var(--foreground-muted)] tracking-widest uppercase">
              AI & Software Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-[var(--radius-sm)] text-xs lg:text-sm font-medium transition-all duration-150",
                  isActive
                    ? "text-[var(--accent)] bg-[var(--accent-muted)] border border-[var(--accent-border)] font-semibold"
                    : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden sm:inline-flex">
            <Button size="sm" variant="primary" className="font-mono text-xs gap-1.5">
              Let&apos;s Talk
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 md:hidden items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--background-secondary)]/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <Container className="py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors flex items-center justify-between",
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent-muted)] font-semibold border border-[var(--accent-border)]"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                  )}
                >
                  {link.name}
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-[var(--border)]">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button size="md" variant="primary" className="w-full justify-center font-mono text-xs">
                  Let&apos;s Talk
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
