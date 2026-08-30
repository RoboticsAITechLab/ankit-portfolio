"use client";

import * as React from "react";
import { AdminCertification, CertificationStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon, XIcon, CheckIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface CertificationFormProps {
  initialData?: AdminCertification | null;
  onSave: (cert: AdminCertification) => void;
  onCancel: () => void;
}

interface FormState {
  title: string;
  issuer: string;
  issueDate: string;
  year: number;
  credentialId: string;
  status: CertificationStatus;
  description: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
}

interface FormErrors {
  title?: string;
  issuer?: string;
  year?: string;
}

export function CertificationForm({
  initialData,
  onSave,
  onCancel,
}: CertificationFormProps) {
  const isEditing = Boolean(initialData);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<FormState>({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "Codingal",
    issueDate: initialData?.issueDate || "",
    year: initialData?.year || new Date().getFullYear(),
    credentialId: initialData?.credentialId || "",
    status: initialData?.status || "Draft",
    description: initialData?.description || "",
    fileName: initialData?.fileName || (initialData?.file ? initialData.file.split("/").pop() || "" : ""),
    fileSize: initialData?.fileSize || "PDF Document",
    fileUrl: initialData?.file || "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Certificate title is required.";
    }

    if (!formData.issuer.trim()) {
      newErrors.issuer = "Issuer is required.";
    }

    if (!formData.year || formData.year < 2000 || formData.year > 2100) {
      newErrors.year = "Enter a valid 4-digit year.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value, 10) || "" : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInKb = Math.round(file.size / 1024);
      const sizeStr = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeStr,
        fileUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      fileName: "",
      fileSize: "",
      fileUrl: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (targetStatus?: CertificationStatus) => {
    if (!validate()) return;

    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[now.getMonth()]} ${now.getDate()}`;

    const certResult: AdminCertification = {
      id: initialData?.id || `cert-${Date.now()}`,
      title: formData.title.trim(),
      issuer: formData.issuer.trim(),
      issueDate: formData.issueDate.trim() || `${formData.year}`,
      year: typeof formData.year === "number" ? formData.year : parseInt(formData.year, 10) || 2025,
      credentialId: formData.credentialId.trim(),
      status: targetStatus || formData.status,
      description: formData.description.trim(),
      file: formData.fileUrl || initialData?.file,
      fileName: formData.fileName || initialData?.fileName,
      fileSize: formData.fileSize || initialData?.fileSize,
      updatedAt: formattedDate,
    };

    onSave(certResult);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      className="space-y-5"
    >
      {/* Row 1: Certificate Title & Issuer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Certificate Title <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Expert AI Programmer"
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border focus:outline-none transition-colors",
              errors.title
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Issuer <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <input
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="Codingal"
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border focus:outline-none transition-colors font-mono",
              errors.issuer
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.issuer && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.issuer}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Certificate Date & Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Certificate Date
          </label>
          <input
            type="text"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            placeholder="e.g. Oct 23, 2025"
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Year <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="2025"
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border focus:outline-none font-mono transition-colors",
              errors.year
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.year && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.year}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Credential ID & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Credential ID
          </label>
          <input
            type="text"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            placeholder="e.g. 87972d5fe89f"
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Status <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono cursor-pointer"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Row 4: Description */}
      <div>
        <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
          Description / Syllabus Focus
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Verified skills, curriculum covered, and engineering scope..."
          className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Row 5: Certificate File Upload UI */}
      <div>
        <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
          Certificate File (PDF / Image)
        </label>

        {formData.fileName ? (
          <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-default)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded bg-[var(--accent-soft)] text-[var(--accent-primary)] shrink-0">
                <CheckIcon className="h-4 w-4" />
              </div>
              <div className="truncate">
                <p className="text-xs font-mono font-semibold text-[var(--text-primary)] truncate">
                  {formData.fileName}
                </p>
                <p className="text-[11px] font-mono text-[var(--text-muted)]">
                  {formData.fileSize}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {formData.fileUrl && (
                <a
                  href={formData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Preview</span>
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              )}
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                aria-label="Remove certificate file"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[var(--border-default)] hover:border-[var(--accent-primary)] rounded-[var(--radius-md)] p-4 text-center cursor-pointer transition-colors bg-[var(--surface-elevated)]/30 hover:bg-[var(--surface-elevated)]"
          >
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              Click to choose certificate file (PDF, PNG, JPG)
            </p>
            <p className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
              Frontend preview state only • No remote upload
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => handleFormSubmit("Draft")}
        >
          Save Draft
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => handleFormSubmit("Published")}
        >
          {isEditing ? "Save Changes" : "Publish Certificate"}
        </Button>
      </div>
    </form>
  );
}
