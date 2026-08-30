"use client";

import * as React from "react";
import { AdminMessage } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { TrashIcon, ArchiveIcon, CheckIcon, MailIcon } from "@/components/ui/Icons";

interface MessageDetailModalProps {
  message: AdminMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRead: (msg: AdminMessage) => void;
  onToggleArchive: (msg: AdminMessage) => void;
  onDelete: (msg: AdminMessage) => void;
}

export function MessageDetailModal({
  message,
  isOpen,
  onClose,
  onToggleRead,
  onToggleArchive,
  onDelete,
}: MessageDetailModalProps) {
  if (!message) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="MESSAGE INQUIRY"
      description={`Received ${message.date}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Sender Info Banner */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {message.senderName}
            </h3>
            <a
              href={`mailto:${message.senderEmail}`}
              className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1.5 mt-0.5"
            >
              <MailIcon className="h-3.5 w-3.5" />
              <span>{message.senderEmail}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <StatusBadge status={message.status} />
            <span className="text-xs text-[var(--text-muted)]">{message.date}</span>
          </div>
        </div>

        {/* Subject */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Subject
          </span>
          <h4 className="text-sm sm:text-base font-mono font-semibold text-[var(--text-primary)] mt-1">
            {message.subject}
          </h4>
        </div>

        {/* Message Content */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Message Body
          </span>
          <div className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap font-sans">
            {message.message}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onClose();
              onDelete(message);
            }}
          >
            <TrashIcon className="h-4 w-4" />
            <span>Delete</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onToggleArchive(message);
              }}
            >
              <ArchiveIcon className="h-4 w-4 text-[var(--text-muted)]" />
              <span>{message.status === "Archived" ? "Unarchive" : "Archive"}</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onToggleRead(message);
              }}
            >
              <CheckIcon className="h-4 w-4" />
              <span>{message.status === "Unread" ? "Mark as Read" : "Mark as Unread"}</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
