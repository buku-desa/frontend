'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { getDocuments, type Document } from '@/lib/api/shared/documents'
import { Loader2, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'

// Dynamic import untuk avoid SSR issues
const Header = dynamic(() => import('@/components/warga/Header'), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b" />
})

const BeritaCard = dynamic<{ doc: any }>(() => import('@/components/warga/BeritaCard'), {
  ssr: false,
})

type SortOrder = 'asc' | 'desc' | null

export default function BeritaDesa() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc') // Default: terbaru dulu
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5 // Tampilkan 5 berita per halaman (lebih kecil untuk berita)

  console.log('🎬 BeritaDesa component rendered')
  console.log('📋 Current state:', {
    loading,
    documentsCount: documents.length,
    currentPage,
    perPage
  })

  // Check if component is mounted (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync search query from URL
  useEffect(() => {
    if (!mounted) return
    const query = searchParams.get('search')
    setSearchQuery(query || '')
  }, [searchParams, mounted])

  // Fetch documents on mount
  useEffect(() => {
    if (!mounted) return
    fetchDocuments()
  }, [mounted])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Fetching berita documents...')
      const response = await getDocuments({ 
        per_page: 100,
        status: 'Disetujui'
      })
      
      console.log('📦 Total documents from API:', response.data.length)
      console.log('📄 Sample document:', response.data[0])
      
      // Filter hanya dokumen berita (peraturan kepala desa)
      const filtered = response.data.filter(
        (doc) => 
          (doc.jenis_dokumen === 'peraturan_kepala_desa' ||
           doc.jenis_dokumen === 'peraturan_bersama_kepala_desa') &&
          doc.status === 'Disetujui'
      )
      
      console.log('✅ Filtered berita:', filtered.length)
      console.log('📋 First filtered doc:', filtered[0])
      
      setDocuments(filtered)
    } catch (err: any) {
      console.error('❌ Error fetching documents:', err)
      setError('Gagal memuat berita')
    } finally {
      setLoading(false)
    }
  }

  // Helper function untuk search
  const matchesSearch = (doc: Document, query: string): boolean => {
    if (!query) return true
    
    const q = query.toLowerCase()
    
    const tentang = doc.tentang?.toString().toLowerCase() || ''
    const nomorDitetapkan = doc.nomor_ditetapkan?.toString().toLowerCase() || ''
    const nomorDiundangkan = doc.nomor_diundangkan?.toString().toLowerCase() || ''
    const tanggalDitetapkan = doc.tanggal_ditetapkan?.toString().toLowerCase() || ''
    const keterangan = doc.keterangan?.toString().toLowerCase() || ''
    
    return (
      tentang.includes(q) ||
      nomorDitetapkan.includes(q) ||
      nomorDiundangkan.includes(q) ||
      tanggalDitetapkan.includes(q) ||
      keterangan.includes(q) ||
      doc.id.toString().includes(q)
    )
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === 'desc') return 'asc'
      if (prev === 'asc') return null
      return 'desc'
    })
  }

  // Filter dan sort documents
  const filteredData = useMemo(() => {
    let filtered = documents

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((doc) => matchesSearch(doc, searchQuery))
    }

    // Sort by tanggal_diundangkan
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.tanggal_diundangkan || 0).getTime()
      const dateB = new Date(b.tanggal_diundangkan || 0).getTime()
      
      if (sortOrder === 'asc') {
        return dateA - dateB // Lama ke baru
      } else if (sortOrder === 'desc') {
        return dateB - dateA // Baru ke lama
      } else {
        return 0 // No sort
      }
    })
  }, [documents, searchQuery, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / perPage)
  const startIndex = (currentPage - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  console.log('📊 Pagination info:', {
    totalDocs: filteredData.length,
    perPage,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    paginatedData: paginatedData.length
  })

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortOrder])

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Don't render until mounted
  if (!mounted) {
    console.log('⏳ Waiting for mount...')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  if (loading) {
    console.log('⏳ Loading data...')
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Memuat Berita Desa...
          </h1>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        </main>
      </>
    )
  }

  if (error) {
    console.log('❌ Error state:', error)
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchDocuments}
              className="px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Berita Desa
            {searchQuery && (
              <span className="text-lg font-normal text-gray-600 ml-3">
                ({filteredData.length} hasil untuk "{searchQuery}")
              </span>
            )}
          </h1>

          {/* Sort Button */}
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            title={
              sortOrder === 'desc' 
                ? 'Urutkan: Terbaru → Terlama' 
                : sortOrder === 'asc' 
                ? 'Urutkan: Terlama → Terbaru' 
                : 'Urutan Default'
            }
          >
            {sortOrder === 'desc' ? (
              <>
                <ArrowDown className="w-4 h-4" />
                <span>Terbaru</span>
              </>
            ) : sortOrder === 'asc' ? (
              <>
                <ArrowUp className="w-4 h-4" />
                <span>Terlama</span>
              </>
            ) : (
              <>
                <ArrowUpDown className="w-4 h-4" />
                <span>Urutkan</span>
              </>
            )}
          </button>
        </div>

        {filteredData.length > 0 ? (
          <>
            {console.log('✅ Rendering berita list, count:', paginatedData.length)}
            <div className="space-y-6">
              {paginatedData.map((docItem) => {
                console.log('📄 Rendering berita:', docItem)
                
                // Skip jika docItem undefined atau null
                if (!docItem) {
                  console.warn('⚠️ Skipping undefined docItem')
                  return null
                }
                
                return (
                  <BeritaCard
                    key={docItem.id}
                    doc={docItem}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            {console.log('🔍 Checking pagination: totalPages =', totalPages, 'should show?', totalPages > 1)}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-6 bg-white border border-gray-200 rounded-lg mt-8">
                <div className="text-sm text-gray-700">
                  Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredData.length)} dari {filteredData.length} berita
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-medium">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
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
                router.push('/berita-desa')
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