"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/shared/ui/button"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [user, setUser] = useState<{ name: string; role: string } | null>(null)
    const router = useRouter()
    const profileRef = useRef<HTMLDivElement>(null)

    // 🔹 Simulasi ambil data user (nanti bisa dari localStorage / API)
    useEffect(() => {
        // contoh: ambil dari localStorage
        // const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
        // setUser(storedUser)

        // sementara, kita buat simulasi
        const loggedInUser = {
            name: "Azmi Khofipah",
            role: "kepdes", // ubah ke "sekdes" untuk tes role lain
        }
        setUser(loggedInUser)
    }, [])

    // 🔹 Tutup popup saat klik di luar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLogout = () => {
        // localStorage.removeItem("user")
        router.push("/login")
    }

    // 🔹 Ubah label sesuai role
    const roleLabel =
        user?.role === "kepdes"
            ? "Kepala Desa"
            : user?.role === "sekdes"
                ? "Sekretaris Desa"
                : "Pengguna"

    return (
        <header className="fixed top-0 left-0 w-full bg-green-50 border-b border-gray-200 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 relative">

                    {/* Tombol menu (strip tiga) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-700 hover:text-green-700"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Navigation utama */}
                    <nav className="hidden md:flex items-center gap-40">
                        <Link href="/kepdes/dashboard" className="text-gray-800 font-medium hover:text-green-700">
                            Beranda
                        </Link>
                        <Link href="/kepdes/dokumen" className="text-gray-800 hover:text-green-700">
                            Dokumen
                        </Link>
                        <Link href="/kepdes/arsip" className="text-gray-800 hover:text-green-700">
                            Arsip
                        </Link>
                        <Link href="/kepdes/aktivitas" className="text-gray-800 hover:text-green-700">
                            Log Aktivitas
                        </Link>
                    </nav>

                    {/* 🔹 Tombol Profile */}
                    <div ref={profileRef} className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
                        >
                            <User size={18} />
                            <span>Profile</span>
                        </button>

                        {/* 🔹 Popup Profile */}
                        {showProfileMenu && user && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                                <div className="px-4 py-2 border-b">
                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-600">{roleLabel}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 🔹 Menu versi mobile */}
                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-2">
                        <Link href="/kepdes/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Beranda
                        </Link>
                        <Link href="/kepdes/dokumen" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Dokumen
                        </Link>
                        <Link href="/kepdes/arsip" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Arsip
                        </Link>
                        <Link href="/kepdes/aktivitas" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Log Aktivitas
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
