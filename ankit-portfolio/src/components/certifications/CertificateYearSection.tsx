import * as React from "react";
import { Certification } from "@/types";
import { CertificateCard } from "@/components/certifications/CertificateCard";
import { Calendar } from "lucide-react";

interface CertificateYearSectionProps {
  year: number;
  certifications: Certification[];
}

export function CertificateYearSection({
  year,
  certifications,
}: CertificateYearSectionProps) {
  return (
    <section className="space-y-8">
      {/* Year Heading & Horizontal Divider */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 font-mono">
          <Calendar className="h-5 w-5 text-[var(--accent)]" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {year}
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)] ml-1">
            {certifications.length} {certifications.length === 1 ? "Credential" : "Credentials"}
          </span>
        </div>
        <div className="flex-1 h-[1px] bg-[var(--border)]" />
      </div>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {certifications.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  );
}
