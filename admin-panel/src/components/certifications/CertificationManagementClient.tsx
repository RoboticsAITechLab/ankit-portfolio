"use client";

import * as React from "react";
import { AdminCertification } from "@/types";
import { getAdminCertifications, createAdminCertification, deleteAdminCertification } from "@/lib/api";
import { CertificationFilters } from "@/components/certifications/CertificationFilters";
import { CertificationTable } from "@/components/certifications/CertificationTable";
import { CertificationForm } from "@/components/certifications/CertificationForm";
import { DeleteCertificationDialog } from "@/components/certifications/DeleteCertificationDialog";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/Icons";

export function CertificationManagementClient() {
  const [certifications, setCertifications] = React.useState<AdminCertification[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState("All");
  const [selectedStatus, setSelectedStatus] = React.useState("All");

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingCert, setEditingCert] = React.useState<AdminCertification | null>(null);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [certToDelete, setCertToDelete] = React.useState<AdminCertification | null>(null);

  const fetchCertifications = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAdminCertifications();
      if (res.success && Array.isArray(res.data)) {
        const mapped: AdminCertification[] = res.data.map((c: any) => {
          const parsedYear = parseInt(c.issue_date, 10) || new Date(c.created_at).getFullYear();
          return {
            id: c.id,
            title: c.title,
            issuer: c.issuer,
            issueDate: c.issue_date,
            year: parsedYear,
            credentialId: c.credential_id || "",
            previewImage: c.badge_image || "/certificates/Advance AI Programmer Certificate.png",
            status: c.published ? "Published" : "Draft",
            updatedAt: new Date(c.updated_at || c.created_at).toISOString().split("T")[0],
          };
        });
        setCertifications(mapped);
      }
    } catch (err) {
      console.error("Failed to load certifications", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  // Derive unique years dynamically from dataset
  const availableYears = React.useMemo(() => {
    const years = Array.from(new Set(certifications.map((c) => c.year)));
    return years.sort((a, b) => b - a);
  }, [certifications]);

  // Filter Certifications Client-Side
  const filteredCertifications = React.useMemo(() => {
    return certifications.filter((cert) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = cert.title.toLowerCase().includes(q);
        const matchesIssuer = cert.issuer.toLowerCase().includes(q);
        const matchesId = cert.credentialId ? cert.credentialId.toLowerCase().includes(q) : false;

        if (!matchesTitle && !matchesIssuer && !matchesId) {
          return false;
        }
      }

      if (selectedYear !== "All" && cert.year.toString() !== selectedYear) {
        return false;
      }

      if (selectedStatus !== "All" && cert.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [certifications, searchQuery, selectedYear, selectedStatus]);

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedYear !== "All" ||
    selectedStatus !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYear("All");
    setSelectedStatus("All");
  };

  // Open Create Form
  const handleOpenAddForm = () => {
    setEditingCert(null);
    setIsFormOpen(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (cert: AdminCertification) => {
    setEditingCert(cert);
    setIsFormOpen(true);
  };

  // Save Certification (Add or Edit)
  const handleSaveCert = async (savedCert: AdminCertification) => {
    try {
      const payload = {
        title: savedCert.title,
        issuer: savedCert.issuer,
        issue_date: String(savedCert.year || savedCert.issueDate),
        credential_id: savedCert.credentialId || null,
        badge_image: savedCert.previewImage || null,
        published: savedCert.status === "Published",
      };

      const res = await createAdminCertification(payload);
      if (res.success && res.data) {
        const mapped: AdminCertification = {
          id: res.data.id,
          title: res.data.title,
          issuer: res.data.issuer,
          issueDate: res.data.issue_date,
          year: parseInt(res.data.issue_date, 10) || new Date().getFullYear(),
          credentialId: res.data.credential_id || "",
          previewImage: res.data.badge_image || "/certificates/Advance AI Programmer Certificate.png",
          status: res.data.published ? "Published" : "Draft",
          updatedAt: new Date().toISOString().split("T")[0],
        };
        setCertifications((prev) => [mapped, ...prev]);
      }
    } catch (err) {
      console.error("Failed to save certification", err);
    }

    setIsFormOpen(false);
    setEditingCert(null);
  };


  // Open Delete Confirmation
  const handleOpenDelete = (cert: AdminCertification) => {
    setCertToDelete(cert);
    setIsDeleteDialogOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async (certId: string) => {
    await deleteAdminCertification(certId);
    setCertifications((prev) => prev.filter((c) => c.id !== certId));
    setIsDeleteDialogOpen(false);
    setCertToDelete(null);
  };


  // Toggle Status between Published and Draft
  const handleToggleStatus = (cert: AdminCertification) => {
    const nextStatus = cert.status === "Published" ? "Draft" : "Published";
    setCertifications((prev) =>
      prev.map((c) =>
        c.id === cert.id ? { ...c, status: nextStatus } : c
      )
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
            CERTIFICATIONS
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mt-1">
            Manage portfolio credentials
          </p>
        </div>

        <Button
          onClick={handleOpenAddForm}
          variant="primary"
          size="md"
          className="self-start sm:self-auto"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Certificate</span>
        </Button>
      </div>

      {/* 2. SEARCH & FILTERS */}
      <CertificationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
        availableYears={availableYears}
      />

      {/* 3. CERTIFICATION TABLE / CARDS */}
      <CertificationTable
        certifications={filteredCertifications}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* 4. RESULTS COUNTER FOOTER */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pt-2">
        <span>
          Showing <strong className="text-[var(--text-primary)]">{filteredCertifications.length}</strong> of{" "}
          <strong className="text-[var(--text-primary)]">{certifications.length}</strong> certificates
        </span>

        {isFiltered && (
          <span className="text-[11px] text-[var(--accent-primary)]">
            Filters Active
          </span>
        )}
      </div>

      {/* 5. ADD / EDIT CERTIFICATE MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCert(null);
        }}
        title={editingCert ? `Edit: ${editingCert.title}` : "Add New Certificate"}
        description={
          editingCert
            ? "Update verified certificate metadata, year, and publishing status."
            : "Register new credential title, issuer, issuance year, and certificate asset."
        }
        maxWidth="xl"
      >
        <CertificationForm
          initialData={editingCert}
          onSave={handleSaveCert}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingCert(null);
          }}
        />
      </Modal>

      {/* 6. DELETE CONFIRMATION DIALOG */}
      <DeleteCertificationDialog
        certification={certToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setCertToDelete(null);
        }}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
