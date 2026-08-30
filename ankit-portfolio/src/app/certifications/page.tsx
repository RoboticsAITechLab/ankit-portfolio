import * as React from "react";
import { Container } from "@/components/ui/Container";
import { CertificateYearSection } from "@/components/certifications/CertificateYearSection";
import { getCertifications } from "@/lib/api";
import { certifications as fallbackCerts } from "@/data/certifications";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Certifications | Ankit Kumar - AI & Software Developer",
  description:
    "Explore verified technical certifications and credentials in AI, Python, Java, SQL, and Full-Stack development achieved by Ankit Kumar.",
};

export default async function CertificationsPage() {
  let certList = fallbackCerts;
  try {
    const res = await getCertifications();
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      certList = res.data.map((c: any) => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        issueDate: c.issue_date,
        year: parseInt(c.issue_date, 10) || new Date(c.created_at || Date.now()).getFullYear(),
        credentialId: c.credential_id || "",
        previewImage: c.badge_image || "/certificates/Advance AI Programmer Certificate.png",
        file: c.credential_url || `/certificates/${c.title} Certificate.pdf`,
        studentName: "Ankit Kumar",
        studentId: "625059",
        description: `Verified achievement in ${c.title}`,
        skills: [c.category || "AI Systems"],
      }));
    }
  } catch (e) {
    console.error("Failed to load certifications from API, using fallback", e);
  }

  // Extract unique years dynamically and sort descending (newest first)
  const uniqueYears = Array.from(
    new Set(certList.map((c) => c.year))
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
            const yearCerts = certList.filter((c) => c.year === year);

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

