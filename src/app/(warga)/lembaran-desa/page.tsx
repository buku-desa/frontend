'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Head from 'next/head'
import Header from '@/components/warga/Header'
import BukuCard from '@/components/warga/BukuCard'
import bukuData from '@/../data/bukuData'

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

export default function BukuLembaranDesa() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      setSearchQuery(query)
    } else {
      setSearchQuery('')
    }
  }, [searchParams])

  const filteredData = useMemo(() => {
    const base = !searchQuery.trim()
      ? bukuData
      : bukuData.filter((doc) => {
          const query = searchQuery.toLowerCase()
          return (
            doc.title.toLowerCase().includes(query) ||
            doc.description.toLowerCase().includes(query) ||
            doc.date.toLowerCase().includes(query) ||
            doc.id.toString().includes(query)
          )
        })

    return [...base].sort((a, b) => {
      const diff = parseIndoDate(a.date) - parseIndoDate(b.date)
      if (diff !== 0) return diff
      return a.id - b.id
    })
  }, [searchQuery])

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
        <title>Buku Lembaran Desa - Warga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Buku Lembaran Desa
          {searchQuery && (
            <span className="text-lg font-normal text-gray-600 ml-3">
              ({filteredData.length} hasil untuk "{searchQuery}")
            </span>
          )}
        </h1>

        {filteredData.length > 0 ? (
          <div className="space-y-6">
            {filteredData.map((doc) => (
              <BukuCard
                key={doc.id}
                id={doc.id}
                title={highlightText(doc.title, searchQuery) as any}
                date={doc.date}
                description={highlightText(doc.description, searchQuery) as any}
                downloads={doc.downloads}
                lines={4}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tidak ada hasil ditemukan
            </h3>
            <p className="text-gray-500">
              Coba gunakan kata kunci yang berbeda atau hapus filter pencarian
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                router.push('/lembaran-desa')
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
