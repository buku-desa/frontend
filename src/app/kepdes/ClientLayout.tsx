// src/app/kepala-desa/ClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { AdminNavbar } from "@/components/shared/AdminNavbar";


export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNavbar basePath="/kepdes" adminRole="Kepala Desa" />
      {/* Wrapper halaman dengan background */}
      <div className="bg-gray-50 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
      </div>

    </>
  );
}
