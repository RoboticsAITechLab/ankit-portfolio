"use client";

import * as React from "react";
import { AdminMessage } from "@/types";
import { StatusBadge } from "@/components/ui/Badge";
import {
  MoreVerticalIcon,
  TrashIcon,
  EyeIcon,
  ArchiveIcon,
  CheckIcon,
} from "@/components/ui/Icons";

interface MessageTableProps {
  messages: AdminMessage[];
  onView: (msg: AdminMessage) => void;
  onDelete: (msg: AdminMessage) => void;
  onToggleRead: (msg: AdminMessage) => void;
  onToggleArchive: (msg: AdminMessage) => void;
}

export function MessageTable({
  messages,
  onView,
  onDelete,
  onToggleRead,
  onToggleArchive,
}: MessageTableProps) {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (messages.length === 0) {
    return (
      <div className="py-16 text-center rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] p-8">
        <p className="text-sm font-mono text-[var(--text-muted)] mb-2">
          No contact messages found.
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Try resetting filters or checking back when visitors submit new inquiries.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 1. DESKTOP TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/50 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-3 px-4 font-semibold">Sender</th>
              <th className="py-3 px-4 font-semibold">Subject</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs sm:text-sm font-mono">
            {messages.map((msg) => (
              <tr
                key={msg.id}
                onClick={() => onView(msg)}
                className="hover:bg-[var(--surface-hover)]/60 transition-colors cursor-pointer group"
              >
                {/* Sender */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {msg.senderName}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {msg.senderEmail}
                    </span>
                  </div>
                </td>

                {/* Subject */}
                <td className="py-3.5 px-4 font-sans text-xs sm:text-sm text-[var(--text-secondary)] max-w-[260px] truncate">
                  <span className={msg.status === "Unread" ? "font-semibold text-[var(--text-primary)]" : ""}>
                    {msg.subject}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-xs text-[var(--text-muted)] whitespace-nowrap">
                  {msg.date}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={msg.status} />
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                  <div className="inline-block">
                    <button
                      onClick={() =>
                        setOpenMenuId((prev) => (prev === msg.id ? null : msg.id))
                      }
                      aria-label={`Actions for message from ${msg.senderName}`}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>

                    {openMenuId === msg.id && (
                      <div
                        role="menu"
                        className="absolute right-4 top-10 w-44 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-1 shadow-2xl z-30 font-mono text-xs text-left"
                      >
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onView(msg);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <EyeIcon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                          <span>View Message</span>
                        </button>

                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onToggleRead(msg);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <CheckIcon className="h-3.5 w-3.5 text-sky-400" />
                          <span>{msg.status === "Unread" ? "Mark Read" : "Mark Unread"}</span>
                        </button>

                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onToggleArchive(msg);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <ArchiveIcon className="h-3.5 w-3.5 text-amber-400" />
                          <span>{msg.status === "Archived" ? "Unarchive" : "Archive"}</span>
                        </button>

                        <div className="h-[1px] bg-[var(--border-subtle)] my-1" />

                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onDelete(msg);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-red-500/15 text-red-400 transition-colors text-left"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. MOBILE CARD VIEW */}
      <div className="md:hidden space-y-3 font-mono">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => onView(msg)}
            className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] space-y-3 cursor-pointer hover:border-[var(--border-strong)] transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">
                  {msg.senderName}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {msg.senderEmail}
                </p>
              </div>
              <StatusBadge status={msg.status} />
            </div>

            <div className="text-xs text-[var(--text-secondary)] font-sans line-clamp-2">
              <span className="font-semibold font-mono text-[var(--text-primary)] mr-1">
                {msg.subject}:
              </span>
              {msg.message}
            </div>

            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]" onClick={(e) => e.stopPropagation()}>
              <span>Received: {msg.date}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleRead(msg)}
                  className="px-2 py-1 rounded bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {msg.status === "Unread" ? "Mark Read" : "Mark Unread"}
                </button>
                <button
                  onClick={() => onDelete(msg)}
                  className="p-1 rounded bg-red-500/10 text-red-400"
                  aria-label="Delete message"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
