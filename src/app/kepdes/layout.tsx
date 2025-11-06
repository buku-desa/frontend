import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/app/globals.css"
import ClientLayout from "./ClientLayout"
import { DocumentsProvider } from "@/lib/contexts/documents-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kepala Desa",
  description: "Dashboard Kepala Desa",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        <DocumentsProvider>
          <ClientLayout>{children}</ClientLayout>
        </DocumentsProvider>
      </body>
    </html>
  )
}
