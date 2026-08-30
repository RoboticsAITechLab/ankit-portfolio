import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { DashboardMetricsClient } from "@/components/dashboard/DashboardMetricsClient";

export const metadata = {
  title: "Dashboard | Admin Panel",
  description: "Portfolio administration and live operations overview",
};

export default function DashboardPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <DashboardMetricsClient />
        </Container>
      </main>
    </AdminShell>
  );
}

