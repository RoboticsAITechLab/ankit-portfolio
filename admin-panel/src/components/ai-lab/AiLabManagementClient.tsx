"use client";

import * as React from "react";
import { AdminAiExperiment } from "@/types";
import { initialAiExperiments } from "@/data/aiLab";
import { AiExperimentFilters } from "@/components/ai-lab/AiExperimentFilters";
import { AiExperimentTable } from "@/components/ai-lab/AiExperimentTable";
import { AiExperimentForm } from "@/components/ai-lab/AiExperimentForm";
import { DeleteExperimentDialog } from "@/components/ai-lab/DeleteExperimentDialog";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/Icons";

export function AiLabManagementClient() {
  const [experiments, setExperiments] = React.useState<AdminAiExperiment[]>(initialAiExperiments);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedStatus, setSelectedStatus] = React.useState("All");

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingExp, setEditingExp] = React.useState<AdminAiExperiment | null>(null);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [expToDelete, setExpToDelete] = React.useState<AdminAiExperiment | null>(null);

  // Filter Experiments
  const filteredExperiments = React.useMemo(() => {
    return experiments.filter((exp) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = exp.name.toLowerCase().includes(q);
        const matchesCategory = exp.category.toLowerCase().includes(q);
        const matchesSlug = exp.slug.toLowerCase().includes(q);
        const matchesTech = exp.technologies.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesCategory && !matchesSlug && !matchesTech) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "All" && exp.category !== selectedCategory) {
        return false;
      }

      // 3. Status Filter
      if (selectedStatus !== "All" && exp.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [experiments, searchQuery, selectedCategory, selectedStatus]);

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedStatus !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
  };

  const handleOpenAddForm = () => {
    setEditingExp(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (exp: AdminAiExperiment) => {
    setEditingExp(exp);
    setIsFormOpen(true);
  };

  const handleSaveExp = (savedExp: AdminAiExperiment) => {
    setExperiments((prev) => {
      const idx = prev.findIndex((e) => e.id === savedExp.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = savedExp;
        return next;
      }
      return [savedExp, ...prev];
    });

    setIsFormOpen(false);
    setEditingExp(null);
  };

  const handleOpenDelete = (exp: AdminAiExperiment) => {
    setExpToDelete(exp);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (expId: string) => {
    setExperiments((prev) => prev.filter((e) => e.id !== expId));
    setIsDeleteDialogOpen(false);
    setExpToDelete(null);
  };

  const handleToggleStatus = (exp: AdminAiExperiment) => {
    const nextStatus = exp.status === "Production-Ready" ? "Experiment" : "Production-Ready";
    setExperiments((prev) =>
      prev.map((e) => (e.id === exp.id ? { ...e, status: nextStatus } : e))
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
            AI LAB
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mt-1">
            Manage AI experiments and prototypes
          </p>
        </div>

        <Button
          onClick={handleOpenAddForm}
          variant="primary"
          size="md"
          className="self-start sm:self-auto"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Experiment</span>
        </Button>
      </div>

      {/* 2. FILTERS */}
      <AiExperimentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* 3. TABLE / CARDS */}
      <AiExperimentTable
        experiments={filteredExperiments}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* 4. RESULTS COUNTER */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pt-2">
        <span>
          Showing <strong className="text-[var(--text-primary)]">{filteredExperiments.length}</strong> of{" "}
          <strong className="text-[var(--text-primary)]">{experiments.length}</strong> experiments
        </span>

        {isFiltered && (
          <span className="text-[11px] text-[var(--accent-primary)]">
            Filters Active
          </span>
        )}
      </div>

      {/* 5. ADD / EDIT MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingExp(null);
        }}
        title={editingExp ? `Edit: ${editingExp.name}` : "Add New Experiment"}
        description={
          editingExp
            ? "Configure experimental parameters, categories, and inference demo URLs."
            : "Register a new AI prototype, RAG system, or autonomous agent loop."
        }
        maxWidth="xl"
      >
        <AiExperimentForm
          initialData={editingExp}
          onSave={handleSaveExp}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingExp(null);
          }}
        />
      </Modal>

      {/* 6. DELETE DIALOG */}
      <DeleteExperimentDialog
        experiment={expToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setExpToDelete(null);
        }}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
