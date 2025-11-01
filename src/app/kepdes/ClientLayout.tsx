"use client"

import { DocumentsProvider } from "@/lib/contexts/documents-context"
import { Header } from "@/components/kepala-desa/header"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentsProvider>
      <Header />
      <main className="pt-10">{children}</main>
    </DocumentsProvider>
  )
}
