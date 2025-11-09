'use client'

import { useEffect, useState } from 'react'
import PDFModal from '@/components/PDFModal'
import { Eye, Download } from 'lucide-react'
import { getDocuments, getDocumentDownloadUrl, type Document } from '@/lib/api/shared/documents'

interface BukuTableProps {
  data?: Document[]
  searchQuery?: string
}

export default function BukuTable({ data, searchQuery }: BukuTableProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null)

  const fetchDocuments = async (query?: string) => {
    setLoading(true)
    setError(null)

    try {
      const params: Record<string, string> = { per_page: '20', status: 'Disetujui' }
      if (query && query.trim()) params.search = query.trim()

      const res = await getDocuments(params)
      const filtered = res.data.filter(
        (doc) => doc.jenis_dokumen === 'peraturan_desa' && doc.status === 'Disetujui'
      )
      setDocuments(filtered)
    } catch (err) {
      setError('Gagal memuat dokumen')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Jika ada data hasil pencarian dari SearchBar, gunakan itu
    if (data !== undefined) {
      // Filter hanya untuk peraturan desa
      const filtered = data.filter(
        (doc) => doc.jenis_dokumen === 'peraturan_desa' && doc.status === 'Disetujui'
      )
      setDocuments(filtered)
      setLoading(false)
      setError(null)
    } else {
      // Jika tidak ada data, fetch berdasarkan searchQuery atau load semua
      fetchDocuments(searchQuery)
    }
  }, [data, searchQuery])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const formatJenis = (jenis: string) =>
    jenis
      ? jenis.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : '-'

  const handleView = (doc: Document) => {
    const pdfUrl = doc.file_upload ? getDocumentDownloadUrl(doc.id) : '/sample.pdf'
    setSelectedPDF({ url: pdfUrl, title: doc.tentang })
  }

  const handleDownload = (doc: Document) => {
    const pdfUrl = doc.file_upload ? getDocumentDownloadUrl(doc.id) : '/sample.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${doc.tentang || 'dokumen'}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) return <p className="text-gray-500">Memuat data...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">NO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">NOMOR & TANGGAL DITETAPKAN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">JENIS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">TENTANG</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">NOMOR & TANGGAL DIUNDANGKAN</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc, index) => {
                const nomorTanggal =
                  doc.nomor_ditetapkan || doc.tanggal_ditetapkan
                    ? `${doc.nomor_ditetapkan || '-'} / ${formatDate(doc.tanggal_ditetapkan)}`
                    : '-'

                const nomorTanggal2 =
                  doc.nomor_diundangkan && doc.tanggal_diundangkan
                    ? `${doc.nomor_diundangkan} / ${formatDate(doc.tanggal_diundangkan)}`
                    : '-'

                return (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{nomorTanggal}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatJenis(doc.jenis_dokumen)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{doc.tentang || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{nomorTanggal2}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleView(doc)}
                          className="bg-green-100 p-2 rounded-lg hover:bg-green-200 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-xs hidden sm:inline">Lihat</span>
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-800 flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-xs hidden sm:inline">Unduh</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {documents.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">
              {searchQuery 
                ? 'Tidak ada dokumen yang sesuai dengan pencarian' 
                : 'Tidak ada dokumen ditemukan'}
            </p>
          </div>
        )}
      </div>

      {selectedPDF && (
        <PDFModal
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
          pdfUrl={selectedPDF.url}
          title={selectedPDF.title}
        />
      )}
    </>
  )
}