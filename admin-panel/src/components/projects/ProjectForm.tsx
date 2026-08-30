"use client";

import * as React from "react";
import { AdminProject, ProjectCategory, ProjectStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface ProjectFormProps {
  initialData?: AdminProject | null;
  onSave: (project: AdminProject) => void;
  onCancel: () => void;
}

interface FormState {
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  shortDescription: string;
  longDescription: string;
  technologiesText: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  caseStudyUrl: string;
}

interface FormErrors {
  title?: string;
  slug?: string;
  shortDescription?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectForm({
  initialData,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = React.useState<FormState>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Full-Stack",
    status: initialData?.status || "Draft",
    shortDescription: initialData?.shortDescription || "",
    longDescription: initialData?.longDescription || "",
    technologiesText: initialData?.technologies ? initialData.technologies.join(", ") : "",
    image: initialData?.image || "",
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    caseStudyUrl: initialData?.caseStudyUrl || "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project name is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens.";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required.";
    }

    // Optional URL validations
    const urlPattern = /^(https?:\/\/|\/)[^\s$.?#].[^\s]*$/i;
    if (formData.liveUrl.trim() && !urlPattern.test(formData.liveUrl.trim())) {
      newErrors.liveUrl = "Enter a valid URL (e.g. https://example.com).";
    }
    if (formData.githubUrl.trim() && !urlPattern.test(formData.githubUrl.trim())) {
      newErrors.githubUrl = "Enter a valid URL (e.g. https://github.com/org/repo).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => {
      // Auto-generate slug if creating new and slug hasn't diverged
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        ...prev,
        title: newTitle,
        slug: isEditing ? prev.slug : autoSlug,
      };
    });

    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (targetStatus?: ProjectStatus) => {
    if (!validate()) return;

    const techArray = formData.technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[now.getMonth()]} ${now.getDate()}`;

    const projectResult: AdminProject = {
      id: initialData?.id || `proj-${Date.now()}`,
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      category: formData.category,
      status: targetStatus || formData.status,
      shortDescription: formData.shortDescription.trim(),
      longDescription: formData.longDescription.trim(),
      technologies: techArray.length > 0 ? techArray : ["TypeScript"],
      image: formData.image.trim(),
      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      caseStudyUrl: formData.caseStudyUrl.trim() || `/projects/${formData.slug.trim()}`,
      updatedAt: formattedDate,
    };

    onSave(projectResult);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      className="space-y-5"
    >
      {/* Row 1: Project Name & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Project Name <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="e.g. VYNTRANET Platform"
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
            Slug <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="vyntranet-platform"
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border font-mono focus:outline-none transition-colors",
              errors.slug
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.slug && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.slug}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Category & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Category <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono cursor-pointer"
          >
            <option value="Full-Stack">Full-Stack</option>
            <option value="AI">AI</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Data">Data</option>
          </select>
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
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Row 3: Short Description */}
      <div>
        <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
          Short Description <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <input
          type="text"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Brief 1-2 sentence engineering problem summary..."
          className={cn(
            "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border focus:outline-none transition-colors",
            errors.shortDescription
              ? "border-red-500/60 focus:border-red-500"
              : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
          )}
        />
        {errors.shortDescription && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
            <AlertTriangleIcon className="h-3 w-3" />
            <span>{errors.shortDescription}</span>
          </p>
        )}
      </div>

      {/* Row 4: Long Description */}
      <div>
        <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
          Long Description / Architecture Overview
        </label>
        <textarea
          name="longDescription"
          rows={3}
          value={formData.longDescription}
          onChange={handleChange}
          placeholder="Technical architecture, trade-offs, and implementation details..."
          className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Row 5: Technologies & Live URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            name="technologiesText"
            value={formData.technologiesText}
            onChange={handleChange}
            placeholder="Next.js, Python, FastAPI, Docker"
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Live URL
          </label>
          <input
            type="text"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border font-mono focus:outline-none",
              errors.liveUrl
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.liveUrl && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.liveUrl}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 6: GitHub URL & Case Study URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            GitHub URL
          </label>
          <input
            type="text"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border font-mono focus:outline-none",
              errors.githubUrl
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.githubUrl && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.githubUrl}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Case Study URL
          </label>
          <input
            type="text"
            name="caseStudyUrl"
            value={formData.caseStudyUrl}
            onChange={handleChange}
            placeholder={`/projects/${formData.slug || "slug"}`}
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>
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
          {isEditing ? "Save Changes" : "Publish Project"}
        </Button>
      </div>
    </form>
  );
}
