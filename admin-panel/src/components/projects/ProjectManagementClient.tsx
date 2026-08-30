"use client";

import * as React from "react";
import { AdminProject } from "@/types";
import { initialProjects } from "@/data/projects";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { DeleteProjectDialog } from "@/components/projects/DeleteProjectDialog";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/Icons";

export function ProjectManagementClient() {
  const [projects, setProjects] = React.useState<AdminProject[]>(initialProjects);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedStatus, setSelectedStatus] = React.useState("All");

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<AdminProject | null>(null);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [projectToDelete, setProjectToDelete] = React.useState<AdminProject | null>(null);

  // Filter Projects Client-Side
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      // 1. Search filter (title, category, technologies)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesCategory = project.category.toLowerCase().includes(q);
        const matchesSlug = project.slug.toLowerCase().includes(q);
        const matchesTech = project.technologies.some((tech) =>
          tech.toLowerCase().includes(q)
        );

        if (!matchesTitle && !matchesCategory && !matchesSlug && !matchesTech) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // 3. Status filter
      if (selectedStatus !== "All" && project.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedStatus !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
  };

  // Open Create Form
  const handleOpenAddForm = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (project: AdminProject) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  // Save Project (Add or Edit)
  const handleSaveProject = (savedProject: AdminProject) => {
    setProjects((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === savedProject.id);
      if (existsIndex >= 0) {
        const next = [...prev];
        next[existsIndex] = savedProject;
        return next;
      }
      return [savedProject, ...prev];
    });

    setIsFormOpen(false);
    setEditingProject(null);
  };

  // Open Delete Confirmation
  const handleOpenDelete = (project: AdminProject) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  // Toggle Status between Published and Draft
  const handleToggleStatus = (project: AdminProject) => {
    const nextStatus = project.status === "Published" ? "Draft" : "Published";
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, status: nextStatus } : p
      )
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
            PROJECTS
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mt-1">
            Manage portfolio projects
          </p>
        </div>

        <Button
          onClick={handleOpenAddForm}
          variant="primary"
          size="md"
          className="self-start sm:self-auto"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* 2. SEARCH & FILTERS */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* 3. PROJECT TABLE / CARDS */}
      <ProjectTable
        projects={filteredProjects}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* 4. RESULTS COUNTER FOOTER */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pt-2">
        <span>
          Showing <strong className="text-[var(--text-primary)]">{filteredProjects.length}</strong> of{" "}
          <strong className="text-[var(--text-primary)]">{projects.length}</strong> projects
        </span>

        {isFiltered && (
          <span className="text-[11px] text-[var(--accent-primary)]">
            Filters Active
          </span>
        )}
      </div>

      {/* 5. ADD / EDIT PROJECT MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? `Edit: ${editingProject.title}` : "Add New Project"}
        description={
          editingProject
            ? "Modify project properties and publish status in local state."
            : "Define project metadata, tags, and endpoints for portfolio showcase."
        }
        maxWidth="xl"
      >
        <ProjectForm
          initialData={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProject(null);
          }}
        />
      </Modal>

      {/* 6. DELETE CONFIRMATION DIALOG */}
      <DeleteProjectDialog
        project={projectToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
