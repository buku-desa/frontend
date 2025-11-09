'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { getDocuments, type Document } from '@/lib/api/shared/documents'

interface SearchBarProps {
  onSearchResults?: (results: Document[]) => void
  onSearchQuery?: (query: string) => void
}

export default function SearchBar({ onSearchResults, onSearchQuery }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    const trimmedQuery = query.trim()
    
    if (!trimmedQuery) {
      // Reset jika query kosong
      onSearchQuery?.('')
      onSearchResults?.([])
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log('Memulai pencarian dengan query:', trimmedQuery)
      
      const res = await getDocuments({ status: 'Disetujui' })
      
      console.log('Response dari API:', res)
      
      if (!res || !res.data || !Array.isArray(res.data)) {
        throw new Error('Format data tidak valid dari API')
      }

      console.log('Total dokumen dari API:', res.data.length)
      if (res.data.length > 0) {
        console.log('Sample dokumen pertama:', res.data[0])
      }

      const filtered = res.data.filter((doc) => {
        const q = trimmedQuery.toLowerCase()
        
        // Konversi semua field ke string untuk menghindari error
        const tentang = doc.tentang?.toString().toLowerCase() || ''
        const nomorDitetapkan = doc.nomor_ditetapkan?.toString().toLowerCase() || ''
        const nomorDiundangkan = doc.nomor_diundangkan?.toString().toLowerCase() || ''
        const jenisDokumen = doc.jenis_dokumen?.toString().toLowerCase() || ''
        
        return (
          doc.status === 'Disetujui' &&
          (tentang.includes(q) ||
           nomorDitetapkan.includes(q) ||
           nomorDiundangkan.includes(q) ||
           jenisDokumen.includes(q))
        )
      })
      
      console.log('Hasil filter:', filtered.length, 'dokumen ditemukan')
      
      // Kirim hasil dan query ke parent
      onSearchResults?.(filtered)
      onSearchQuery?.(trimmedQuery)
      
      // Tidak ada error meskipun hasil 0
      setError(null)
    } catch (err) {
      console.error('Error saat pencarian:', err)
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat hasil pencarian'
      setError(errorMessage)
      onSearchResults?.([])
      onSearchQuery?.('')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-2 border border-gray-200">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 py-3 outline-none text-gray-700 placeholder:text-gray-400"
            placeholder="Cari judul, nomor, atau jenis dokumen"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Search size={18} />
          {loading ? 'Mencari...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}