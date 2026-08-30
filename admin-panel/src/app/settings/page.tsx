import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { SettingsClient } from "@/components/settings/SettingsClient";

export const metadata = {
  title: "Settings | Admin Panel",
  description: "Manage admin profile, portfolio links, and system preferences",
};

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <SettingsClient />
        </Container>
      </main>
    </AdminShell>
  );
}
