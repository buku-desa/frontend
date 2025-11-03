import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../src/components/warga/Header'
import Hero from '../src/components/warga/Hero'
import SearchBar from '../src/components/warga/SearchBar'
import BeritaCard from '../src/components/warga/BeritaCard'
import BukuTable from '../src/components/warga/BukuTable'
import bukuData from '../src/data/bukuData'

const mockBerita = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  title: `Peraturan Kalurahan ${i + 2021}`,
}))

const extractYear = (value: string) => {
  const match = value.match(/(\d{4})\b/)
  return match ? Number(match[1]) : new Date().getFullYear()
}

const tableRows = bukuData.slice(0, 5).map((doc, index) => ({
  no: index + 1,
  judul: doc.title,
  jenis: 'Peraturan',
  tahun: extractYear(doc.date),
  viewHref: `/buku-lembaran/${doc.id}`,
  downloadHref: doc.pdfUrl ? encodeURI(doc.pdfUrl) : undefined,
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
          <BukuTable rows={tableRows} />
        </div>
      </section>
    </>
  )
}

export default Home
