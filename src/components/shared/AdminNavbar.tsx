"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, LogOut } from "lucide-react"

interface MenuItem {
  name: string
  path: string
  icon: string
}

interface AdminNavbarProps {
  basePath: string
  adminRole?: string
  adminName?: string
}

export function AdminNavbar({ basePath, adminRole = "Admin", adminName = "Nama Admin" }: AdminNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path

  const menuItems: MenuItem[] = [
    { name: "Beranda", path: `${basePath}/dashboard`, icon: "📊" },
    { name: "Dokumen", path: `${basePath}/dokumen`, icon: "📄" },
    { name: "Arsip", path: `${basePath}/arsip`, icon: "🗄️" },
    { name: "Log Aktivitas", path: `${basePath}/aktivitas`, icon: "🕒" },
  ]

  // Tutup popup jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <>
      {/* Overlay untuk sidebar di mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300 md:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">{adminRole}</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Tutup menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive(item.path)
                      ? "bg-[#2D5F2E] text-white"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#E6F4E6] border-b border-gray-200 shadow-sm z-30">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4 px-4 sm:px-6 lg:px-8 h-16">
          {/* Tombol hamburger */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 hover:text-green-700 transition-colors p-2 md:hidden flex-shrink-0"
            aria-label="Buka menu"
          >
            <Menu size={24} />
          </button>

          {/* Menu utama */}
          <nav className="hidden md:flex items-center gap-6 ml-auto flex-shrink-0">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${isActive(item.path)
                  ? "text-gray-900 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Ikon profil */}
          <div className="relative flex-shrink-0" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 hover:bg-green-800 transition-colors"
              aria-label="Profile"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Popup profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-800">{adminName}</p>
                  <p className="text-xs text-gray-500">{adminRole}</p>
                </div>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="h-16" />
    </>
  )
}
