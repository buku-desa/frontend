"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-green-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-800 font-medium hover:text-green-700">
                            Beranda
                        </Link>
                        <Link href="/dokumen" className="text-gray-800 font-medium hover:text-green-700">
                            Buku Lembaran Desa
                        </Link>
                        <Link href="/berita" className="text-gray-800 font-medium hover:text-green-700">
                            Berita Desa
                        </Link>
                    </nav>

                    {/* Admin Button */}
                    <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">Admin</Button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-2">
                        <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Beranda
                        </Link>
                        <Link href="/dokumen" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Buku Lembaran Desa
                        </Link>
                        <Link href="/berita" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                            Berita Desa
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
