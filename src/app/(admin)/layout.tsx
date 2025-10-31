"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Dokumen", path: "/dokumen", icon: "📄" },
    { name: "Arsip", path: "/arsip", icon: "🗄️" },
    { name: "Log Aktivitas", path: "/aktivitas", icon: "🕒" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar Overlay - Muncul saat menu diklik */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden by default, muncul saat icon menu diklik */}
      <aside
        className={`fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto z-50 transform transition-transform duration-300 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
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
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-[#2D5F2E] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Wrapper - Full width karena sidebar hidden */}
      <div className="w-full">
        {/* Header */}
        <header className="bg-[#E6F4E6] shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Hamburger Menu - SELALU TERLIHAT */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="text-black hover:text-gray-700"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Center Navigation */}
            <nav className="flex items-center gap-8 mx-auto">
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors ${
                  isActive("/admin")
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Beranda
              </Link>
              <Link
                href="/dokumen"
                className={`text-sm font-medium transition-colors ${
                  isActive("/dokumen")
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Dokumen
              </Link>
              <Link
                href="/arsip"
                className={`text-sm font-medium transition-colors ${
                  isActive("/arsip")
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Arsip
              </Link>
              <Link
                href="/aktivitas"
                className={`text-sm font-medium transition-colors ${
                  isActive("/aktivitas")
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Log Aktivitas
              </Link>
            </nav>

            {/* Log in Admin Button */}
            <Link
              href="/login"
              className="bg-[#2D5F2E] hover:bg-[#234a23] text-white px-5 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              Log in Admin
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  className="w-5 h-5"
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
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                        isActive(item.path)
                          ? "bg-[#2D5F2E] text-white"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
