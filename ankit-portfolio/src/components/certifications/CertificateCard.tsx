import * as React from "react";
import Image from "next/image";
import { Certification } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, Award, ShieldCheck } from "lucide-react";

interface CertificateCardProps {
  cert: Certification;
}

export function CertificateCard({ cert }: CertificateCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)] group relative overflow-hidden">
      <div>
        {/* Certificate Visual Preview */}
        <a
          href={cert.file}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full aspect-[4/3] mb-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden group-hover:border-[var(--accent-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          title={`Open ${cert.title} Certificate PDF`}
        >
          {cert.previewImage ? (
            <Image
              src={cert.previewImage}
              alt={`${cert.title} Certificate preview issued by ${cert.issuer}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-grid-subtle">
              <Award className="h-10 w-10 text-[var(--accent)] mb-2" />
              <span className="font-mono text-xs text-[var(--foreground)] font-bold">
                {cert.title}
              </span>
            </div>
          )}

          {/* Floating Verified Ribbon */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="font-mono text-[10px] text-emerald-400 bg-[var(--background)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Verified
            </span>
          </div>
        </a>

        {/* Certificate Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1.5 line-clamp-2">
          {cert.title}
        </h3>

        {/* Issuer & Date */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] mb-3">
          <span>{cert.issuer}</span>
          <span>•</span>
          <span className="text-[var(--foreground-muted)]">{cert.issueDate}</span>
        </div>

        {/* Optional Description */}
        {cert.description && (
          <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-4 line-clamp-2">
            {cert.description}
          </p>
        )}

        {/* Skills Tag Pills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.map((skill) => (
              <Badge key={skill} variant="default" size="sm" className="font-mono text-[10px]">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Credential ID & Action */}
      <div className="pt-4 mt-auto border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
        <div className="flex flex-col">
          <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">
            Credential ID
          </span>
          <span className="text-xs font-semibold text-[var(--foreground)] select-all truncate max-w-[130px] sm:max-w-[150px]">
            {cert.credentialId}
          </span>
        </div>

        <a
          href={cert.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors p-1 group/link"
        >
          <span>View Certificate</span>
          <ArrowUpRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
