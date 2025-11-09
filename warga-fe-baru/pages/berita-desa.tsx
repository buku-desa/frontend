import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../src/components/warga/Header'
import BeritaCardHorizontal from '../src/components/warga/BeritaCardHorizontal'
import bukuData from '../src/data/bukuData'

// Parser tanggal Indonesia: "DD NamaBulan YYYY"
const indoMonths: Record<string, number> = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
}

function parseIndoDate(d: string): number {
  const parts = d.trim().split(/\s+/)
  if (parts.length < 3) return 0
  const [ddStr, monthStr, yyStr] = [parts[0], parts[1], parts[2]]
  const day = parseInt(ddStr, 10) || 1
  const month = indoMonths[monthStr.toLowerCase()] ?? 0
  const year = parseInt(yyStr, 10) || 1970
  return new Date(year, month, day).getTime()
}

function normalizeKey(s?: string | number) {
  if (s === undefined || s === null) return ''
  return String(s)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type BeritaItem = {
  id: number
  title: string
  date: string
  description: string
  url?: string
  docId?: number
}

const mockBerita: BeritaItem[] = [
  {
    id: 4,
    title: 'Sosialisasi Perda DIY Nomor 3 Tahun 2020: DPRD DIY Tekankan Pembangunan Wilayah Perbatasan',
    date: '15 Oktober 2025',
    description: 'DPRD DIY menyelenggarakan sosialisasi Peraturan Daerah DIY Nomor 3 Tahun 2020 dengan menekankan pentingnya pembangunan wilayah perbatasan untuk kemajuan daerah.',
    url: '/Sosialisasi Perda DIY Nomor 3 Tahun 2020_ DPRD DIY Tekankan Pembangunan Wilayah Perbatasan.pdf',
  },
  {
    id: 1,
    title: 'Caturtunggal Hadirkan Dukcapil dan Pengadilan Negeri Sleman',
    date: '1 Oktober 2025',
    description: 'Kalurahan Caturtunggal menghadirkan layanan Dukcapil dan Pengadilan Negeri Sleman untuk kemudahan warga dalam mengurus administrasi dan layanan hukum.',
    url: '/Caturtunggal Hadirkan Dukcapil dan Pengadilan Negeri Sleman.pdf',
  },
  {
    id: 3,
    title: 'Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal',
    date: '24 September 2025',
    description: 'Kalurahan Caturtunggal memberikan bantuan bibit ikan dan perlengkapan budidaya kepada kelompok pembudidaya ikan Minadadi untuk meningkatkan produksi dan kesejahteraan masyarakat.',
    url: '/Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal.pdf',
  },
  {
    id: 2,
    title: 'Ujian Seleksi Pamong Kalurahan Caturtunggal Resmi Dibuka',
    date: '1 September 2025',
    description: 'Kalurahan Caturtunggal membuka pendaftaran ujian seleksi calon pamong kalurahan untuk mengisi posisi yang dibutuhkan dalam pelayanan kepada masyarakat.',
    url: '/Ujian Seleksi Pamong Kalurahan Caturtunggal Resmi Dibuka.pdf',
  },
]

const BeritaDesa: NextPage = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // Sync state with URL query on mount and URL changes
  useEffect(() => {
    const query = router.query.search as string
    if (query) {
      setSearchQuery(query)
    }
  }, [router.query.search])

  // No on-page search bar; this page reads ?search= from URL only

  // Filter data based on search query
  const combinedData = useMemo(() => {
    // Hanya gunakan data dari mockBerita, tidak perlu merge dengan bukuData
    return mockBerita.map((item) => {
      // Jika sudah punya url langsung, kembalikan apa adanya
      if (item.url) {
        return item
      }

      // Jika punya docId, ambil data dari bukuData
      if (item.docId) {
        const doc = bukuData.find((d) => d.id === item.docId)
        if (doc) {
          return {
            ...item,
            title: item.title || doc.title,
            date: doc.date,
            description: doc.description,
            url: `/buku-lembaran/${doc.id}`,
          }
        }
      }

      return item
    })
  }, [])

  const filteredData = useMemo(() => {
    const base = !searchQuery.trim()
      ? combinedData
      : combinedData.filter((berita) => {
          const query = searchQuery.toLowerCase()
          return (
            berita.title.toLowerCase().includes(query) ||
            berita.description.toLowerCase().includes(query) ||
            berita.date.toLowerCase().includes(query) ||
            berita.id.toString().includes(query)
          )
        })

    return [...base].sort((a, b) => {
      const diff = parseIndoDate(a.date) - parseIndoDate(b.date)
      if (diff !== 0) return diff
      return a.id - b.id
    })
  }, [searchQuery, combinedData])

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 font-semibold">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Berita Desa - Warga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Berita Desa
          {searchQuery && (
            <span className="text-lg font-normal text-gray-600 ml-3">
              ({filteredData.length} hasil untuk "{searchQuery}")
            </span>
          )}
        </h1>
        
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((berita, index) => {
              const card = (
                <BeritaCardHorizontal
                  title={highlightText(berita.title, searchQuery) as any}
                  date={berita.date}
                  description={highlightText(berita.description, searchQuery) as any}
                  isHighlighted={index === 0}
                />
              )

              return 'url' in berita && berita.url ? (
                <Link key={berita.id} href={berita.url} className="block">
                  {card}
                </Link>
              ) : (
                <div key={berita.id}>{card}</div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada hasil ditemukan</h3>
            <p className="text-gray-500">
              Coba gunakan kata kunci yang berbeda atau hapus filter pencarian
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                router.push(router.pathname, undefined, { shallow: true })
              }}
              className="mt-6 px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
            >
              Hapus Pencarian
            </button>
          </div>
        )}
      </main>
    </>
  )
}

export default BeritaDesa