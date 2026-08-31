import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { AnalyticsClient } from "@/components/analytics/AnalyticsClient";

export const metadata = {
  title: "Analytics | Admin Panel",
  description: "Portfolio performance, visitor traffic, and engagement insights",
};

export default function AdminAnalyticsPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <AnalyticsClient />
        </Container>
      </main>
    </AdminShell>
  );
}

