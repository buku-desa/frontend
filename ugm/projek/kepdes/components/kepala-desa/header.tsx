"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/kepala-desa/ui/button"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
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

                    {/* Navigation versi horizontal (desktop) */}
                    <nav className="hidden md:flex items-center gap-40">
                        <Link href="/" className="text-gray-800 font-medium hover:text-green-700">
                            Beranda
                        </Link>
                        <Link href="/dokumen" className="text-gray-800 hover:text-green-700">
                            Dokumen
                        </Link>
                        <Link href="/arsip" className="text-gray-800 hover:text-green-700">
                            Arsip
                        </Link>
                        <Link href="/aktivitas" className="text-gray-800 hover:text-green-700">
                            Log Aktivitas
                        </Link>
                    </nav>

                    {/* Tombol Admin */}
                    <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
                        Admin
                    </Button>
                </div>

                {/* Menu vertikal yang muncul ketika tombol strip ditekan */}
                {isOpen && (
                    <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-gray-200 flex flex-col p-4 space-y-4 z-20">

                        <Link
                            href="/"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/dokumen"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Dokumen
                        </Link>
                        <Link
                            href="/arsip"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Arsip
                        </Link>
                        <Link
                            href="/aktivitas"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Log Aktivitas
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}
