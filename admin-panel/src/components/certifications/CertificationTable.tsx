"use client";

import * as React from "react";
import { AdminCertification } from "@/types";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import {
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
} from "@/components/ui/Icons";

interface CertificationTableProps {
  certifications: AdminCertification[];
  onEdit: (cert: AdminCertification) => void;
  onDelete: (cert: AdminCertification) => void;
  onToggleStatus: (cert: AdminCertification) => void;
}

export function CertificationTable({
  certifications,
  onEdit,
  onDelete,
  onToggleStatus,
}: CertificationTableProps) {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (certifications.length === 0) {
    return (
      <div className="py-16 text-center rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] p-8">
        <p className="text-sm font-mono text-[var(--text-muted)] mb-2">
          No certificates matched your criteria.
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Try clearing your search query or reset year and status filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 1. DESKTOP & TABLET TABLE VIEW (Hidden on small mobile screens) */}
      <div className="hidden md:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/50 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-3 px-4 font-semibold">Certificate</th>
              <th className="py-3 px-4 font-semibold">Issuer</th>
              <th className="py-3 px-4 font-semibold">Year</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Updated</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs sm:text-sm">
            {certifications.map((cert) => (
              <tr
                key={cert.id}
                className="hover:bg-[var(--surface-hover)]/60 transition-colors group"
              >
                {/* Certificate Cell */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold font-mono text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {cert.title}
                    </span>
                    {cert.credentialId && (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[280px]">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </td>

                {/* Issuer Cell */}
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-secondary)]">
                  <Badge variant="default" size="sm">
                    {cert.issuer}
                  </Badge>
                </td>

                {/* Year Cell */}
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-secondary)] whitespace-nowrap">
                  {cert.year}
                </td>

                {/* Status Cell */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={cert.status} />
                </td>

                {/* Updated Cell */}
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-muted)] whitespace-nowrap">
                  {cert.updatedAt}
                </td>

                {/* Actions Cell */}
                <td className="py-3.5 px-4 text-right relative">
                  <div
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === cert.id ? null : cert.id
                        )
                      }
                      aria-label={`Actions for ${cert.title}`}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>

                    {/* Dropdown Action Menu */}
                    {openMenuId === cert.id && (
                      <div
                        role="menu"
                        className="absolute right-4 top-10 w-44 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-1 shadow-2xl z-30 font-mono text-xs text-left"
                      >
                        {/* View Certificate */}
                        {cert.file && (
                          <a
                            href={cert.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            onClick={() => setOpenMenuId(null)}
                          >
                            <EyeIcon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                            <span>View PDF</span>
                            <ExternalLinkIcon className="h-3 w-3 ml-auto opacity-60" />
                          </a>
                        )}

                        {/* Edit Certificate */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onEdit(cert);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <EditIcon className="h-3.5 w-3.5 text-sky-400" />
                          <span>Edit</span>
                        </button>

                        {/* Publish / Unpublish Toggle */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onToggleStatus(cert);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                        >
                          <RefreshCwIcon className="h-3.5 w-3.5 text-emerald-400" />
                          <span>
                            {cert.status === "Published"
                              ? "Unpublish (Draft)"
                              : "Publish"}
                          </span>
                        </button>

                        <div className="h-[1px] bg-[var(--border-subtle)] my-1" />

                        {/* Delete Action */}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            onDelete(cert);
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

      {/* 2. MOBILE CARD LIST VIEW (Displayed on small mobile screens) */}
      <div className="md:hidden space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                  {cert.title}
                </h4>
                <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">
                  {cert.issuer} • {cert.year}
                </p>
                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-[var(--text-muted)]">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
              <StatusBadge status={cert.status} />
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 font-mono text-xs">
              {cert.file && (
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
                >
                  <EyeIcon className="h-3 w-3 text-[var(--accent-primary)]" />
                  <span>View</span>
                </a>
              )}

              <button
                onClick={() => onEdit(cert)}
                className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <EditIcon className="h-3 w-3 text-sky-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onToggleStatus(cert)}
                className="px-2 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title={cert.status === "Published" ? "Unpublish" : "Publish"}
              >
                <RefreshCwIcon className="h-3 w-3 text-emerald-400" />
              </button>

              <button
                onClick={() => onDelete(cert)}
                className="px-2 py-1.5 rounded-[var(--radius-sm)] bg-red-500/10 border border-red-500/20 text-red-400"
                title="Delete"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
