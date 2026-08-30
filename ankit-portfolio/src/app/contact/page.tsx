import * as React from "react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { contactInfo } from "@/data/contact";
import { MessageSquare, Clock } from "lucide-react";

export const metadata = {
  title: "Contact | Ankit Kumar - AI & Software Developer",
  description:
    "Get in touch with Ankit Kumar for software engineering inquiries, AI architectures, full-stack systems, or collaborative engineering projects.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full py-12 md:py-20 lg:py-24">
      <Container>
        {/* SECTION 1 — PAGE HEADER */}
        <header className="max-w-3xl mb-12 md:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-4">
            <MessageSquare className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase">
              LET&apos;S BUILD
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.08] mb-4">
            HAVE A PROJECT IN MIND?
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed">
            Let&apos;s discuss what you&apos;re building.
          </p>
        </header>

        {/* SECTION 2 — MAIN CONTACT AREA (2 EQUAL COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16 md:mb-20">
          {/* Left Column: Form */}
          <ContactForm />

          {/* Right Column: Connect & Availability */}
          <ContactLinks />
        </div>

        {/* SECTION 3 — RESPONSE NOTE */}
        <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--foreground-muted)] flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>
              <strong className="text-[var(--foreground-secondary)]">RESPONSE NOTE:</strong>{" "}
              {contactInfo.responseNote}
            </span>
          </div>

          <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">
            Verified Communication Channel
          </span>
        </div>
      </Container>
    </div>
  );
}
