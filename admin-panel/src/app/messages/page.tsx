import * as React from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Container } from "@/components/ui/Container";
import { MessagesManagementClient } from "@/components/messages/MessagesManagementClient";

export const metadata = {
  title: "Messages | Admin Panel",
  description: "Manage contact inquiries and correspondence",
};

export default function AdminMessagesPage() {
  return (
    <AdminShell>
      <main className="py-8 sm:py-10">
        <Container>
          <MessagesManagementClient />
        </Container>
      </main>
    </AdminShell>
  );
}
