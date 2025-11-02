"use client"

import { AdminNavbar } from "@/components/shared/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar basePath="/sekdes" adminRole="Sekretaris Desa" />
      <main>{children}</main>
    </div>
  )
}
