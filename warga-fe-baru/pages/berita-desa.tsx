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
    id: 6,
    title: 'PERATURAN KALURAHAN CATURTUNGGAL APBKAL 2023',
    date: '30 Desember 2022',
    description: 'Peraturan Kalurahan Caturtunggal tentang APBKAL 2023',
    docId: 6,
  },
  {
    id: 1,
    title: 'PERATURAN KALURAHAN SENDANGSARI NOMOR 6 TAHUN 2021 TENTANG RENCANA KERJA PEMERINTAH KALURAHAN TAHUN 2022',
    date: '26 November 2021',
    description: 'Peraturan Kalurahan Sendangsari nomor 6 tahun 2021 tentang Rencana Kerja Pemerintah Kalurahan Tahun 2022',
    docId: 1,
  },
  {
    id: 2,
    title: 'PERKAL NO.1 TAHUN 2022 LAPORAN PERTANGGUNGJAWABAN',
    date: '16 Februari 2022',
    description: 'Laporan Pertanggungjawaban Realisasi Pelaksanaan APBKal Tahun Anggaran 2021 Pemerintah Kalurahan Wonokromo',
    docId: 2,
  },
  {
    id: 3,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
  {
    id: 4,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
  {
    id: 5,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
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
    const matchedDocIds = new Set<number>()

    const mergedMock = mockBerita.map((item) => {
      if (item.docId) {
        const doc = bukuData.find((d) => d.id === item.docId)
        if (doc) {
          matchedDocIds.add(doc.id)
          return {
            ...item,
            title: item.title || doc.title,
            date: doc.date,
            description: doc.description,
            url: `/buku-lembaran/${doc.id}`,
          }
        }
      }

      const itemKey = normalizeKey(item.title)
      const doc = bukuData.find((d) => {
        const docKey = normalizeKey(d.title)
        return docKey === itemKey || docKey.includes(itemKey) || itemKey.includes(docKey)
      })

      if (doc) {
        matchedDocIds.add(doc.id)
        return {
          ...item,
          url: `/buku-lembaran/${doc.id}`,
          date: doc.date,
          description: doc.description,
        }
      }

      return item
    })

    const extraDocs = bukuData
      .filter((doc) => !matchedDocIds.has(doc.id))
      .map((doc) => ({
        id: 1000 + doc.id,
        title: doc.title,
        date: doc.date,
        description: doc.description,
        url: `/buku-lembaran/${doc.id}`,
      }))

    return [...mergedMock, ...extraDocs]
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
