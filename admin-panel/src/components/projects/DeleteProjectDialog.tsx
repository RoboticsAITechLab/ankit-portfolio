"use client";

import * as React from "react";
import { AdminProject } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon } from "@/components/ui/Icons";

interface DeleteProjectDialogProps {
  project: AdminProject | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (projectId: string) => void;
}

export function DeleteProjectDialog({
  project,
  isOpen,
  onClose,
  onConfirmDelete,
}: DeleteProjectDialogProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project?"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertTriangleIcon className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-red-300 mb-1">
              Are you sure you want to delete &ldquo;{project.title}&rdquo;?
            </p>
            <p className="text-red-400/80">
              This action cannot be undone. All associated configuration and metadata will be removed from local state.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onConfirmDelete(project.id);
              onClose();
            }}
          >
            Delete Project
          </Button>
        </div>
      </div>
    </Modal>
  );
}
