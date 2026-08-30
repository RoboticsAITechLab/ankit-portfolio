import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { ProjectManagementClient } from "@/components/projects/ProjectManagementClient";

export const metadata = {
  title: "Projects | Admin Panel",
  description: "Manage portfolio projects and case studies",
};

export default function AdminProjectsPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <ProjectManagementClient />
        </Container>
      </main>
    </AdminShell>
  );
}
