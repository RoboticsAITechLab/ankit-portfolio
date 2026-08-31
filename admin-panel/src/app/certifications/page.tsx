import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { CertificationManagementClient } from "@/components/certifications/CertificationManagementClient";

export const metadata = {
  title: "Certifications | Admin Panel",
  description: "Manage portfolio certifications and verified credentials",
};

export default function AdminCertificationsPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <CertificationManagementClient />
        </Container>
      </main>
    </AdminShell>
  );
}

