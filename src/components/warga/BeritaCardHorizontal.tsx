'use client'

import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { getDocuments, type Document } from '@/lib/api/shared/documents'

interface BeritaCardHorizontalProps {
  data?: Document[]
  searchQuery?: string
}

export default function BeritaCardHorizontal({ data, searchQuery }: BeritaCardHorizontalProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDocuments = async (query?: string) => {
    setLoading(true)
    setError(null)
    try {
      // Coba berbagai format parameter
      const params: any = { 
        // status: 'Disetujui',
        per_page: 100, 
      }
      if (query && query.trim()) params.search = query.trim()

      console.log('BeritaCard - Fetching dengan params:', params)
      const res = await getDocuments(params)
      console.log('BeritaCard - Response:', res)
      console.log('BeritaCard - Total data dari API:', res.data?.length || 0)
      
      const filtered = res.data.filter(
        (d) =>
          d.jenis_dokumen === 'peraturan_kepala_desa' ||
          d.jenis_dokumen === 'peraturan_bersama_kepala_desa'
      )
      
      console.log('BeritaCard - Setelah filter jenis dokumen:', filtered.length)
      console.log('BeritaCard - Data filtered:', filtered)
      
      // Untuk sementara tampilkan SEMUA hasil (hapus slice untuk testing)
      setDocuments(filtered)
    } catch (err: any) {
      console.error(err)
      setError('Gagal memuat data dokumen')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Jika ada data hasil pencarian dari SearchBar, gunakan itu
    if (data !== undefined) {
      // Filter hanya untuk jenis berita (peraturan kepala desa)
      const filtered = data.filter(
        (d) =>
          d.jenis_dokumen === 'peraturan_kepala_desa' ||
          d.jenis_dokumen === 'peraturan_bersama_kepala_desa'
      )
      // Saat search, tampilkan semua hasil (tidak dibatasi)
      setDocuments(filtered)
      setLoading(false)
    } else {
      // Jika tidak ada data, fetch berdasarkan searchQuery atau load semua
      fetchDocuments(searchQuery)
    }
  }, [data, searchQuery])

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

  if (loading) return <p className="text-gray-500">Memuat data...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (documents.length === 0)
    return (
      <p className="text-gray-500">
        {searchQuery 
          ? 'Tidak ada berita yang sesuai dengan pencarian' 
          : 'Tidak ada dokumen ditemukan'}
      </p>
    )

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex gap-4 items-center min-w-[280px]"
        >
          <div className="w-20 h-20 bg-green-50 rounded-lg shrink-0 flex items-center justify-center border border-green-100">
            <FileText className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-2">
              {doc.tentang}
            </h3>
            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(doc.tanggal_ditetapkan)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}