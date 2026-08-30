"use client";

import * as React from "react";
import { AdminProject } from "@/types";
import { getAdminProjects, createAdminProject, deleteAdminProject } from "@/lib/api";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { DeleteProjectDialog } from "@/components/projects/DeleteProjectDialog";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/Icons";

export function ProjectManagementClient() {
  const [projects, setProjects] = React.useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedStatus, setSelectedStatus] = React.useState("All");

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<AdminProject | null>(null);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [projectToDelete, setProjectToDelete] = React.useState<AdminProject | null>(null);

  const fetchProjects = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAdminProjects();
      if (res.success && Array.isArray(res.data)) {
        const mapped: AdminProject[] = res.data.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          shortDescription: p.description,
          longDescription: p.long_description || p.description,
          category: (p.category as any) || "Full-Stack",
          technologies: p.technologies || [],
          status: p.published ? "Published" : "Draft",
          liveUrl: p.demo_url || undefined,
          githubUrl: p.github_url || undefined,
          updatedAt: new Date(p.updated_at || p.created_at).toISOString().split("T")[0],
        }));
        setProjects(mapped);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter Projects Client-Side
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
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

      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

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
  const handleSaveProject = async (savedProject: AdminProject) => {
    try {
      const payload = {
        slug: savedProject.slug,
        title: savedProject.title,
        description: savedProject.shortDescription,
        long_description: savedProject.longDescription || savedProject.shortDescription,
        category: savedProject.category,
        technologies: savedProject.technologies,
        github_url: savedProject.githubUrl || null,
        demo_url: savedProject.liveUrl || null,
        published: savedProject.status === "Published",
      };

      const res = await createAdminProject(payload);
      if (res.success && res.data) {
        const mapped: AdminProject = {
          id: res.data.id,
          slug: res.data.slug,
          title: res.data.title,
          shortDescription: res.data.description,
          longDescription: res.data.long_description || res.data.description,
          category: (res.data.category as any) || "Full-Stack",
          technologies: res.data.technologies || [],
          status: res.data.published ? "Published" : "Draft",
          liveUrl: res.data.demo_url || undefined,
          githubUrl: res.data.github_url || undefined,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        setProjects((prev) => [mapped, ...prev]);
      }
    } catch (err) {
      console.error("Failed to save project", err);
    }

    setIsFormOpen(false);
    setEditingProject(null);
  };


  // Open Delete Confirmation
  const handleOpenDelete = (project: AdminProject) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async (projectId: string) => {
    await deleteAdminProject(projectId);
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
