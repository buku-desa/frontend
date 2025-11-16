'use client'

import { useState } from 'react'
import Image from 'next/image'
import Hero from '@/../public/hero.png'
import SearchBar from '@/components/warga/SearchBar'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const BukuTable = dynamic(() => import('@/components/warga/BukuTable'), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b" />
})

const BeritaCardHorizontal = dynamic(() => import('@/components/warga/BeritaCardHorizontal'), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b" />
})

import { type Document } from '@/lib/api/shared/documents'

export default function BerandaPage() {
  const [searchResults, setSearchResults] = useState<Document[] | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchResults = (results: Document[]) => {
    setSearchResults(results)
  }

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query)
    // Reset hasil jika query kosong
    if (!query.trim()) {
      setSearchResults(undefined)
    }
  }

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-80 md:h-96">
        <Image src={Hero} alt="Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center">
            Sistem Informasi Buku dan Administrasi Desa
          </h1>
          <p className="text-lg md:text-xl text-center">
            Portal Buku dan Administrasi Desa Terpadu
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4 z-20">
          <div className="max-w-4xl mx-auto">
            <SearchBar 
              onSearchResults={handleSearchResults}
              onSearchQuery={handleSearchQuery}
            />
          </div>
        </div>
      </div>

      <div className="h-12 md:h-16"></div>

      {/* Tampilkan informasi hasil pencarian */}
      {searchQuery && (
        <section className="max-w-6xl mx-auto px-4 mt-8">
          <p className="text-gray-600 mb-4">
            Hasil pencarian untuk: <span className="font-semibold">"{searchQuery}"</span>
            {searchResults && ` (${searchResults.length} dokumen ditemukan)`}
          </p>
        </section>
      )}

      {/* Berita Desa */}
      <section className="max-w-6xl mx-auto px-4 mt-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Berita Desa</h2>
          <Link href="/berita-desa" className="text-green-600 hover:text-green-700 font-medium text-sm">
            Lihat Semua →
          </Link>
        </div>
        <BeritaCardHorizontal 
          data={searchResults}
          searchQuery={searchQuery}
        />
      </section>

      {/* Buku Lembaran Desa */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Buku Lembaran Desa</h2>
        <BukuTable 
          data={searchResults}
          searchQuery={searchQuery}
        />
      </section>
    </>
  )
}