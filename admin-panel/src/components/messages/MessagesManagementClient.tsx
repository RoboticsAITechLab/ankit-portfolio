"use client";

import * as React from "react";
import { AdminMessage } from "@/types";
import { initialMessages } from "@/data/messages";
import { MessageFilters } from "@/components/messages/MessageFilters";
import { MessageTable } from "@/components/messages/MessageTable";
import { MessageDetailModal } from "@/components/messages/MessageDetailModal";
import { DeleteMessageDialog } from "@/components/messages/DeleteMessageDialog";

export function MessagesManagementClient() {
  const [messages, setMessages] = React.useState<AdminMessage[]>(initialMessages);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("All");

  // Detail Modal State
  const [selectedMessage, setSelectedMessage] = React.useState<AdminMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [messageToDelete, setMessageToDelete] = React.useState<AdminMessage | null>(null);

  // Filter Messages
  const filteredMessages = React.useMemo(() => {
    return messages.filter((msg) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSender = msg.senderName.toLowerCase().includes(q);
        const matchesEmail = msg.senderEmail.toLowerCase().includes(q);
        const matchesSubject = msg.subject.toLowerCase().includes(q);
        const matchesBody = msg.message.toLowerCase().includes(q);

        if (!matchesSender && !matchesEmail && !matchesSubject && !matchesBody) {
          return false;
        }
      }

      // 2. Status Filter
      if (selectedStatus !== "All" && msg.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [messages, searchQuery, selectedStatus]);

  const isFiltered = searchQuery.trim() !== "" || selectedStatus !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
  };

  const handleViewMessage = (msg: AdminMessage) => {
    // If opening unread message, mark as read automatically in UI
    if (msg.status === "Unread") {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: "Read" } : m))
      );
      setSelectedMessage({ ...msg, status: "Read" });
    } else {
      setSelectedMessage(msg);
    }
    setIsDetailOpen(true);
  };

  const handleToggleRead = (msg: AdminMessage) => {
    const nextStatus = msg.status === "Unread" ? "Read" : "Unread";
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, status: nextStatus } : m))
    );
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage((prev) => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  const handleToggleArchive = (msg: AdminMessage) => {
    const nextStatus = msg.status === "Archived" ? "Read" : "Archived";
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, status: nextStatus } : m))
    );
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage((prev) => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  const handleOpenDelete = (msg: AdminMessage) => {
    setMessageToDelete(msg);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (msgId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    setIsDeleteDialogOpen(false);
    setMessageToDelete(null);
    if (selectedMessage?.id === msgId) {
      setIsDetailOpen(false);
      setSelectedMessage(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. PAGE HEADER */}
      <div className="pb-4 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
            MESSAGES
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mt-1">
            Contact inquiries and engineering proposals
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
          <span className="px-2.5 py-1 rounded bg-[var(--surface-card)] border border-[var(--border-default)]">
            Total: {messages.length}
          </span>
          <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/25">
            Unread: {messages.filter((m) => m.status === "Unread").length}
          </span>
        </div>
      </div>

      {/* 2. FILTERS */}
      <MessageFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* 3. TABLE / CARDS */}
      <MessageTable
        messages={filteredMessages}
        onView={handleViewMessage}
        onDelete={handleOpenDelete}
        onToggleRead={handleToggleRead}
        onToggleArchive={handleToggleArchive}
      />

      {/* 4. RESULTS COUNTER */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pt-2">
        <span>
          Showing <strong className="text-[var(--text-primary)]">{filteredMessages.length}</strong> of{" "}
          <strong className="text-[var(--text-primary)]">{messages.length}</strong> messages
        </span>

        {isFiltered && (
          <span className="text-[11px] text-[var(--accent-primary)]">
            Filters Active
          </span>
        )}
      </div>

      {/* 5. DETAIL MODAL */}
      <MessageDetailModal
        message={selectedMessage}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedMessage(null);
        }}
        onToggleRead={handleToggleRead}
        onToggleArchive={handleToggleArchive}
        onDelete={handleOpenDelete}
      />

      {/* 6. DELETE DIALOG */}
      <DeleteMessageDialog
        message={messageToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setMessageToDelete(null);
        }}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
