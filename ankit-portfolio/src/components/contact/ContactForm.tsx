"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = React.useState<FormState>(initialFormState);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Enter a valid email address.";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for that field on edit
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate brief client-side validation transition
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-emerald-500/30 bg-[var(--card)] p-8 sm:p-10 flex flex-col items-center justify-center text-center">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <h3 className="font-mono text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">
          Message Prepared Successfully
        </h3>

        <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-md mb-6 leading-relaxed">
          Thanks <strong className="text-[var(--foreground)]">{formData.name}</strong> — your message draft has been structured. (Frontend demo mode: backend transmission pending implementation).
        </p>

        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-left w-full max-w-md mb-6 space-y-1 text-[var(--foreground-muted)]">
          <div><strong className="text-[var(--foreground)]">Sender:</strong> {formData.email}</div>
          {formData.subject && <div><strong className="text-[var(--foreground)]">Subject:</strong> {formData.subject}</div>}
          <div className="pt-2 border-t border-[var(--border-subtle)] text-[var(--foreground-secondary)] line-clamp-3">
            {formData.message}
          </div>
        </div>

        <Button
          size="md"
          variant="secondary"
          onClick={handleReset}
          className="font-mono text-xs gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 md:p-10 shadow-lg">
      <div className="mb-6 pb-4 border-b border-[var(--border-subtle)]">
        <h3 className="font-mono text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
          CONTACT FORM
        </h3>
        <p className="text-xs sm:text-sm text-[var(--foreground-muted)] font-mono mt-1">
          Direct engineering inquiries & collaboration
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs sm:text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Name <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Connor"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={isSubmitting}
            className={cn(
              "w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 border text-sm transition-all focus:outline-none focus:ring-2",
              errors.name
                ? "border-red-500/60 focus:ring-red-500/30"
                : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
            )}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs sm:text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={isSubmitting}
            className={cn(
              "w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 border text-sm transition-all focus:outline-none focus:ring-2",
              errors.email
                ? "border-red-500/60 focus:ring-red-500/30"
                : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
            )}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Subject Field (Optional) */}
        <div>
          <label
            htmlFor="subject"
            className="block font-mono text-xs sm:text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Subject <span className="text-[var(--foreground-muted)] font-normal text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project collaboration / Engineering role"
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 border border-[var(--border)] text-sm transition-all focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block font-mono text-xs sm:text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Message <span className="text-[var(--accent)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe what you're building, scope, timeline, and technology expectations..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            disabled={isSubmitting}
            className={cn(
              "w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 border text-sm transition-all focus:outline-none focus:ring-2 resize-y min-h-[120px]",
              errors.message
                ? "border-red-500/60 focus:ring-red-500/30"
                : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
            )}
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isSubmitting}
            className="w-full font-mono text-sm gap-2"
          >
            {isSubmitting ? (
              <span>Validating Message...</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
