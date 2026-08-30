import * as React from "react";
import { Container } from "@/components/ui/Container";
import { CertificateYearSection } from "@/components/certifications/CertificateYearSection";
import { certifications } from "@/data/certifications";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Certifications | Ankit Kumar - AI & Software Developer",
  description:
    "Explore verified technical certifications and credentials in AI, Python, Java, SQL, and Full-Stack development achieved by Ankit Kumar.",
};

export default function CertificationsPage() {
  // Extract unique years dynamically and sort descending (newest first)
  const uniqueYears = Array.from(
    new Set(certifications.map((c) => c.year))
  ).sort((a, b) => b - a);

  return (
    <div className="flex flex-col w-full py-12 md:py-20 lg:py-24">
      <Container>
        {/* PAGE HEADER */}
        <header className="max-w-3xl mb-16 md:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-4">
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase">
              VERIFIED CREDENTIALS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight mb-4">
            CERTIFICATIONS
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] leading-relaxed">
            Technical learning and verified achievements
          </p>
        </header>

        {/* CHRONOLOGICAL YEAR SECTIONS */}
        <div className="space-y-16 md:space-y-24">
          {uniqueYears.map((year) => {
            const yearCerts = certifications.filter((c) => c.year === year);

            return (
              <CertificateYearSection
                key={year}
                year={year}
                certifications={yearCerts}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
