"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/shared/ui/button"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        // 🔹 Biar header nempel di atas dan selalu terlihat saat scroll
        <header className="fixed top-0 left-0 w-full bg-green-50 border-b border-gray-200 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Tombol strip tiga di pojok kiri atas */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-700 hover:text-green-700"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Navigation */}
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

                    {/* Tombol Admin */}
                    <Link href="/login">
                        <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
                            Admin
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-2">
                        <Link href="/kepdes/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
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
