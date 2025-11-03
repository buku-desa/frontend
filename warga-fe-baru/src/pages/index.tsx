import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/warga/Header'
import Hero from '../components/warga/Hero'
import SearchBar from '../components/warga/SearchBar'
import BeritaCard from '../components/warga/BeritaCard'
import BukuTable from '../components/warga/BukuTable'

const mockBerita = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  title: `Judul berita desa ${i + 1}`,
}))

const mockRows = Array.from({ length: 5 }).map((_, i) => ({
  no: i + 1,
  judul: `Perdes Yogya Nomor ${i + 1} tentang RKP Desa Tahun 2022`,
  jenis: 'Peraturan',
  tahun: 2022 + (i % 3),
}))

const Home: NextPage = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to buku-lembaran-desa with search query
      router.push(`/buku-lembaran-desa?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      <Head>
        <title>Warga FE Baru</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Hero />
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold">Berita Desa</h2>
        <div className="mt-4 overflow-x-auto">
          <div className="flex gap-4 snap-x snap-mandatory pb-2">
            {mockBerita.map((b) => (
              <BeritaCard key={b.id} title={b.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold">Buku Lembaran Desa</h2>
        <div className="mt-4 mb-10">
          <BukuTable rows={mockRows} />
        </div>
      </section>
    </>
  )
}

export default Home
