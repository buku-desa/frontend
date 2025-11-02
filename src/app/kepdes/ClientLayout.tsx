// src/app/kepala-desa/ClientLayout.tsx
"use client";

import { DocumentsProvider } from "@/lib/contexts/documents-context"
import { AdminNavbar } from "@/components/shared/AdminNavbar"

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <DocumentsProvider>
      <AdminNavbar basePath="/kepdes" adminRole="Kepala Desa" />
      <main>{children}</main>
    </DocumentsProvider>
  )
}

