import type { Metadata } from "next"
import "@/app/globals.css"
import ClientLayout from "./ClientLayout"
import { DocumentsProvider } from "@/lib/contexts/documents-context"

export const metadata: Metadata = {
  title: "Kepala Desa",
  description: "Dashboard Kepala Desa",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      {/* ❗ TIDAK ADA className di body agar tidak override font global */}
      <body suppressHydrationWarning>
        <DocumentsProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </DocumentsProvider>
      </body>
    </html>
  )
}
