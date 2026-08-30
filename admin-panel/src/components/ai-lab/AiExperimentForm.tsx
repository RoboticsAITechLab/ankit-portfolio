"use client";

import * as React from "react";
import { AdminAiExperiment, AiExperimentCategory, AiExperimentStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface AiExperimentFormProps {
  initialData?: AdminAiExperiment | null;
  onSave: (exp: AdminAiExperiment) => void;
  onCancel: () => void;
}

interface FormState {
  name: string;
  slug: string;
  category: AiExperimentCategory;
  status: AiExperimentStatus;
  shortDescription: string;
  longDescription: string;
  technologiesText: string;
  demoUrl: string;
  repoUrl: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  slug?: string;
  shortDescription?: string;
}

export function AiExperimentForm({
  initialData,
  onSave,
  onCancel,
}: AiExperimentFormProps) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = React.useState<FormState>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "RAG",
    status: initialData?.status || "Prototype",
    shortDescription: initialData?.shortDescription || "",
    longDescription: initialData?.longDescription || "",
    technologiesText: initialData?.technologies ? initialData.technologies.join(", ") : "",
    demoUrl: initialData?.demoUrl || "",
    repoUrl: initialData?.repoUrl || "",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Experiment name is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens.";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData((prev) => {
      const autoSlug = newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        ...prev,
        name: newName,
        slug: isEditing ? prev.slug : autoSlug,
      };
    });

    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
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

  const handleFormSubmit = (targetStatus?: AiExperimentStatus) => {
    if (!validate()) return;

    const techArray = formData.technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[now.getMonth()]} ${now.getDate()}`;

    const expResult: AdminAiExperiment = {
      id: initialData?.id || `ai-exp-${Date.now()}`,
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      category: formData.category,
      status: targetStatus || formData.status,
      shortDescription: formData.shortDescription.trim(),
      longDescription: formData.longDescription.trim(),
      technologies: techArray.length > 0 ? techArray : ["Python", "AI"],
      demoUrl: formData.demoUrl.trim(),
      repoUrl: formData.repoUrl.trim() || "https://github.com/RoboticsAITechLab",
      notes: formData.notes.trim(),
      updatedAt: formattedDate,
    };

    onSave(expResult);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      className="space-y-5"
    >
      {/* Row 1: Experiment Name & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Experiment Name <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="e.g. Document Q&A RAG Engine"
            className={cn(
              "w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border focus:outline-none transition-colors",
              errors.name
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)]"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>{errors.name}</span>
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
            placeholder="document-qa-rag"
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
            <option value="RAG">RAG</option>
            <option value="Agents">Agents</option>
            <option value="Automation">Automation</option>
            <option value="AI/Data">AI/Data</option>
            <option value="NLP">NLP</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Other">Other</option>
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
            <option value="Prototype">Prototype</option>
            <option value="Experiment">Experiment</option>
            <option value="In Development">In Development</option>
            <option value="Production-Ready">Production-Ready</option>
            <option value="Coming Soon">Coming Soon</option>
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
          placeholder="Brief 1-2 sentence experiment purpose..."
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

      {/* Row 4: Technologies & Demo URL */}
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
            placeholder="LangChain, Qdrant, FastAPI, Docker"
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Demo / Interactive URL
          </label>
          <input
            type="text"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Row 5: Repo URL & Technical Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Repository URL
          </label>
          <input
            type="text"
            name="repoUrl"
            value={formData.repoUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-3.5 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5">
            Technical Notes
          </label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Benchmark rates, hardware configs, etc."
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
          onClick={() => handleFormSubmit("Experiment")}
        >
          Save Experiment
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => handleFormSubmit("Production-Ready")}
        >
          {isEditing ? "Save Changes" : "Deploy Experiment"}
        </Button>
      </div>
    </form>
  );
}
