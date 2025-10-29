"use client";

import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-[#E6F4E6] shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-black hover:text-gray-700"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="text-black hover:text-gray-700 font-medium"
            >
              Beranda
            </a>
            <a
              href="/buku-lembaran"
              className="text-black hover:text-gray-700 font-medium"
            >
              Buku Lembaran Desa
            </a>
            <a
              href="/berita"
              className="text-black hover:text-gray-700 font-medium"
            >
              Berita Desa
            </a>
          </nav>

          {/* Log in Admin Button */}
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-medium">
            Log in Admin
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Menu Admin</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin"
                  className="block px-4 py-2 rounded hover:bg-green-50 text-gray-700 hover:text-green-700"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/dokumen"
                  className="block px-4 py-2 rounded hover:bg-green-50 text-gray-700 hover:text-green-700"
                >
                  Dokumen
                </a>
              </li>
              <li>
                <a
                  href="/arsip"
                  className="block px-4 py-2 rounded hover:bg-green-50 text-gray-700 hover:text-green-700"
                >
                  Arsip
                </a>
              </li>
              <li>
                <a
                  href="/aktivitas"
                  className="block px-4 py-2 rounded hover:bg-green-50 text-gray-700 hover:text-green-700"
                >
                  Aktivitas
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-0">{children}</main>
    </div>
  );
}
