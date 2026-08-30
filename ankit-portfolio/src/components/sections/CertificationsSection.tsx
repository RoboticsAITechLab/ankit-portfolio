import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { certifications } from "@/data/certifications";
import { Award, ArrowUpRight, ArrowRight, ShieldCheck } from "lucide-react";

export function CertificationsSection() {
  const displayCerts = certifications.slice(0, 3);

  return (
    <section id="certifications" className="py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        {/* Section Header with View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeading
            badge="CREDENTIALS"
            title="VERIFIED CERTIFICATIONS"
            description="Industry-recognized certifications and specialized engineering credentials in AI and software systems."
            className="mb-0"
          />
          <Link
            href="/certifications"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors self-start sm:self-end pb-2 group"
          >
            View All Credentials
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayCerts.map((cert) => (
            <Card
              key={cert.id}
              hoverEffect
              className="flex flex-col justify-between border-[var(--border)] bg-[var(--card)] relative group"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                      <Award className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </div>

                  <CardTitle className="text-base font-bold text-[var(--foreground)] line-clamp-2 min-h-[3rem]">
                    {cert.title}
                  </CardTitle>

                  <p className="font-mono text-xs text-[var(--accent)]">
                    {cert.issuer} • {cert.issueDate}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <Badge key={s} variant="default" size="sm" className="text-[10px] font-mono">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="mt-4 pt-3 flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-[var(--foreground-muted)] truncate max-w-[140px]">
                  ID: {cert.credentialId || "VERIFIED"}
                </span>
                <a
                  href={cert.credentialUrl || "https://aws.amazon.com/certification/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors"
                >
                  View Certificate
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
