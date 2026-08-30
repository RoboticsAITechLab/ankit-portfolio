"use client";

import * as React from "react";
import { AdminAiExperiment } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon } from "@/components/ui/Icons";

interface DeleteExperimentDialogProps {
  experiment: AdminAiExperiment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (expId: string) => void;
}

export function DeleteExperimentDialog({
  experiment,
  isOpen,
  onClose,
  onConfirmDelete,
}: DeleteExperimentDialogProps) {
  if (!experiment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Experiment?"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertTriangleIcon className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-red-300 mb-1">
              Are you sure you want to delete &ldquo;{experiment.name}&rdquo;?
            </p>
            <p className="text-red-400/80">
              This action cannot be undone. The experiment metadata and sandbox routes will be deleted from local state.
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
              onConfirmDelete(experiment.id);
              onClose();
            }}
          >
            Delete Experiment
          </Button>
        </div>
      </div>
    </Modal>
  );
}
