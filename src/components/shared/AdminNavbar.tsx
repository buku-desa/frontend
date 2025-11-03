"use client"

import { useState, useRef, useEffect } from "react"
// import Link from "next/link" // DIHAPUS - Menyebabkan error build
// import { usePathname, useRouter } from "next/navigation" // DIHAPUS - Menyebabkan error build
import { Menu, X, LogOut } from "lucide-react" // Ini tetap ada, asumsi 'lucide' BISA di-import

interface MenuItem {
  name: string
  path: string
  icon: string
}

interface AdminNavbarProps {
  basePath: string
  adminRole?: string // Ini akan jadi fallback
  adminName?: string // Ini akan jadi fallback
}

export function AdminNavbar({ basePath, adminRole = "Admin", adminName = "Nama Admin" }: AdminNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  // --- State untuk data user ---
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  
  // --- PENGGANTI usePathname ---
  const [pathname, setPathname] = useState('')
  
  const profileRef = useRef<HTMLDivElement>(null)

  // --- PENGGANTI useRouter ---
  const router = {
    push: (href: string) => {
      window.location.href = href
    }
  }

  // Cek path saat komponen dimuat di client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])
  // --- AKHIR PENGGANTI ---

  const isActive = (path: string) => pathname === path

  const menuItems: MenuItem[] = [
    { name: "Beranda", path: `${basePath}/dashboard`, icon: "📊" },
    { name: "Dokumen", path: `${basePath}/dokumen`, icon: "📄" },
    { name: "Arsip", path: `${basePath}/arsip`, icon: "🗄️" },
    { name: "Log Aktivitas", path: `${basePath}/aktivitas`, icon: "🕒" },
  ]

  // --- Mengambil data user dari localStorage ---
  useEffect(() => {
    const storedName = localStorage.getItem("username")
    const storedRole = localStorage.getItem("userRole")

    if (storedName && storedRole) {
      setUser({ name: storedName, role: storedRole })
    }
  }, [])
  // --- Akhir ---

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

  // --- LOGIKA LOGOUT YANG BENAR ---
  const handleLogout = () => {
    // 1. HAPUS data sesi dari localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username'); // Hapus semua yang Anda set saat login

    // 2. SETELAH DIHAPUS, baru redirect ke halaman login
    router.push("/");
  }
  // --- AKHIR LOGIKA LOGOUT ---

  // Tampilkan role yang benar (dari state atau fallback prop)
  const displayRole = user?.role === "kepdes" ? "Kepala Desa" : user?.role === "sekdes" ? "Sekretaris Desa" : adminRole;
  const displayName = user?.name || adminName;

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
            <h2 className="text-lg font-semibold text-gray-800">{displayRole}</h2>
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
                  {/* GANTI <Link> ke <a> */}
                  <a
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive(item.path)
                      ? "bg-[#2D5F2E] text-white"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#E6F4E6] border-b border-gray-200 shadow-sm z-30">
        {/* --- PERBAIKAN TATA LETAK ---
          Mengganti 'gap-4' dengan 'justify-between' 
          untuk mendorong grup kiri dan kanan
        */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          
          {/* GRUP KIRI: Hamburger & Logo */}
          <div className="flex items-center gap-3">
            {/* Tombol hamburger */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-700 hover:text-green-700 transition-colors p-2 md:hidden shrink-0"
              aria-label="Buka menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo dan Nama SIMBADES */}
            <a href="/" className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              </div>
              {/* Nama (hilang di layar kecil, muncul di sm) */}
              <span className="hidden sm:block text-xl font-bold text-green-800">SIMBADES</span>
            </a>
          </div>

          {/* GRUP KANAN: Menu Desktop & Profil */}
          <div className="flex items-center gap-6">
            {/* Menu utama (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 shrink-0">
              {menuItems.map((item) => (
                // GANTI <Link> ke <a>
                <a
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${isActive(item.path)
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                    }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Ikon profil (Selalu Tampil) */}
            <div className="relative shrink-0" ref={profileRef}>
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
                    {/* Menggunakan data dari state/localStorage */}
                    <p className="text-sm font-semibold text-gray-800">{displayName}</p>
                    <p className="text-xs text-gray-500">{displayRole}</p>
                  </div>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout} // <-- LOGIKA LOGOUT DIPASANG DI SINI
                    className="flex items-center gap-2 w-full text-left text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div> {/* Akhir Grup Kanan */}

        </div>
      </header>

      {/* Spacer seukuran header */}
      <div className="h-16" />
    </>
  )
}