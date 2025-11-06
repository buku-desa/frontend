'use client'

import { useState } from 'react'
import Image from 'next/image'
import Hero from '@/../public/hero.png'
import SearchBar from '@/components/warga/SearchBar'
import BeritaCardHorizontal from '@/components/warga/BeritaCardHorizontal'
import BukuTable from '@/components/warga/BukuTable'
import Link from 'next/link'

const mockBerita = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  title: `Judul berita desa ${i + 1}`,
  date: '14 September 2025',
}))

const mockRows = Array.from({ length: 5 }).map((_, i) => ({
  no: i + 1,
  judul: `Perdes Yogya Nomor ${i + 1} tentang RKP Desa Tahun 2022`,
  jenis: 'Peraturan',
  tahun: 2022 + (i % 3),
  pdfUrl: '/sample.pdf',
}))

export default function BerandaPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Nanti bisa redirect atau filter
  }

  return (
    <>
      {/* Hero Section with SearchBar Overlay */}
      <div className="relative w-full h-80 md:h-96">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={Hero} 
            alt="Hero" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center drop-shadow-lg">
            Sistem Informasi Buku dan Administrasi Desa
          </h1>
          <p className="text-lg md:text-xl text-center drop-shadow-md">
            Portal Buku dan Administrasi Desa Terpadu
          </p>
        </div>

        {/* SearchBar Overlay - DI DEPAN GAMBAR */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 z-20">
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Spacing untuk SearchBar yang setengah keluar */}
      <div className="h-12 md:h-16"></div>

      {/* Berita Desa Section - HORIZONTAL SCROLL */}
      <section className="max-w-6xl mx-auto px-4 mt-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Berita Desa</h2>
          <Link href="/berita-desa" className="text-green-600 hover:text-green-700 font-medium text-sm">
            Lihat Semua →
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4">
            {mockBerita.map((b) => (
              <div key={b.id} className="shrink-0">
                <BeritaCardHorizontal title={b.title} date={b.date} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buku Lembaran Desa Section */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Buku Lembaran Desa</h2>
        <BukuTable rows={mockRows} />
      </section>
    </>
  )
}