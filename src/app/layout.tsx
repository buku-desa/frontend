import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { DocumentsProvider } from "@/lib/contexts/documents-context"
import { Header } from "@/components/kepala-desa/header"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <DocumentsProvider>
          <Header />
          <main className="pt-10">{children}</main>
        </DocumentsProvider>
      </body>

    </html>
  )
}
