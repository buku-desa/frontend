import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../src/components/warga/Header'
import Hero from '../src/components/warga/Hero'
import SearchBar from '../src/components/warga/SearchBar'
import BeritaCard from '../src/components/warga/BeritaCard'
import BukuTable from '../src/components/warga/BukuTable'

const mockBerita = Array.from({ length: 4 }).map((_, i) => ({
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
  return (
    <>
      <Head>
        <title>Warga FE Baru</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Hero />
      <SearchBar />

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold">Berita Desa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {mockBerita.map((b) => (
            <BeritaCard key={b.id} title={b.title} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold">Buku Lembaran Desa</h2>
        <BukuTable rows={mockRows} />
      </section>
    </>
  )
}

export default Home
