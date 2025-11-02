"use client"

import { Button } from "@/components/shared/ui/button"
import { Eye, Download, Edit3, Archive } from "lucide-react"

import { AdminNavbar } from "@/components/shared/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar basePath="/sekdes" adminRole="Sekretaris Desa" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  )
}
