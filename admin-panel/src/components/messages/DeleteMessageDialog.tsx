"use client";

import * as React from "react";
import { AdminMessage } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangleIcon } from "@/components/ui/Icons";

interface DeleteMessageDialogProps {
  message: AdminMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (msgId: string) => void;
}

export function DeleteMessageDialog({
  message,
  isOpen,
  onClose,
  onConfirmDelete,
}: DeleteMessageDialogProps) {
  if (!message) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Message?"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertTriangleIcon className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-red-300 mb-1">
              Delete inquiry from &ldquo;{message.senderName}&rdquo;?
            </p>
            <p className="text-red-400/80">
              This action cannot be undone. The message will be removed from local state.
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
              onConfirmDelete(message.id);
              onClose();
            }}
          >
            Delete Message
          </Button>
        </div>
      </div>
    </Modal>
  );
}
