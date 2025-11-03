'use client'

import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import BeritaCardHorizontal from '@/components/warga/BeritaCardHorizontal'
import bukuDataRaw from '@/../data/bukuData'

type BeritaItem = {
    id: number
    title: string
    date: string
    description?: string
    url?: string
    docId?: number
}

// cast sumber data
const bukuData: BeritaItem[] = (bukuDataRaw as unknown) as BeritaItem[]

// helper: normalisasi string untuk pencocokan sederhana
function normalizeKey(s: string) {
    return s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove diacritics
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

// helper: parse tanggal Indonesia sederhana -> timestamp (ms)
function parseIndoDate(dateStr: string): number {
    if (!dateStr) return 0
    const months: Record<string, number> = {
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
    const parts = dateStr.trim().split(/\s+/)
    // expecting e.g. "26 November 2021" or "16 Februari 2022"
    if (parts.length >= 3) {
        const day = parseInt(parts[0], 10) || 1
        const monthName = parts[1].toLowerCase()
        const year = parseInt(parts[2], 10) || 1970
        const month = months[monthName] ?? 0
        return new Date(year, month, day).getTime()
    }
    // fallback: try Date.parse
    const t = Date.parse(dateStr)
    return isNaN(t) ? 0 : t
}

const BeritaDesa: NextPage = () => {
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')

    // Sync state with URL query on mount and URL changes
    useEffect(() => {
        const query = searchParams?.get('search') ?? ''
        setSearchQuery(query)
    }, [searchParams])

    // gunakan hanya bukuData sebagai sumber kebenaran
    const combinedData = useMemo(() => {
        // buat salinan dan pastikan setiap item punya url (opsional)
        return bukuData.map((d) => ({
            ...d,
            url: d.url ?? `/buku-lembaran/${d.id}`,
            description: d.description ?? '',
        }))
    }, [])

    const filteredData = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        const base = !q
            ? combinedData
            : combinedData.filter((berita) => {
                    return (
                        berita.title.toLowerCase().includes(q) ||
                        (berita.description ?? '').toLowerCase().includes(q) ||
                        berita.date.toLowerCase().includes(q) ||
                        berita.id.toString().includes(q)
                    )
                })

        return [...base].sort((a, b) => {
            const diff = parseIndoDate(b.date) - parseIndoDate(a.date) // recent first
            if (diff !== 0) return diff
            return a.id - b.id
        })
    }, [searchQuery, combinedData])

    // Highlight matching text (tetap ada bila perlu)
    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text
        const parts = text.split(new RegExp(`(${query})`, 'gi'))
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={i} className="bg-yellow-200 font-semibold">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </>
        )
    }

    return (
        <>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Berita Desa</h1>

                <div className="space-y-4">
                    {filteredData.map((berita, index) => (
                        <BeritaCardHorizontal
                            key={berita.id}
                            title={berita.title}
                            date={berita.date}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}

export default BeritaDesa
