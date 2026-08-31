import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { AiLabManagementClient } from "@/components/ai-lab/AiLabManagementClient";

export const metadata = {
  title: "AI Lab | Admin Panel",
  description: "Manage AI experiments, prototypes, and research modules",
};

export default function AdminAiLabPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <AiLabManagementClient />
        </Container>
      </main>
    </AdminShell>
  );
}

