'use client'

import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import PDFModal from '@/components/PDFModal'
import {
  getDocuments,
  getDocumentDownloadUrl,
  type Document,
} from '@/lib/api/shared/documents'

export default function BeritaCard() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDocuments()
        const filtered = res.data.filter(
          (doc) =>
            (doc.jenis_dokumen === 'peraturan_kepala_desa' ||
              doc.jenis_dokumen === 'peraturan_bersama_kepala_desa') &&
            doc.status === 'Disetujui'
        )
        setDocuments(filtered)
      } catch (err) {
        console.error(err)
        setError('Gagal memuat berita desa')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  // OPEN modal preview (title guaranteed = doc.tentang)
  const handleView = (doc: Document) => {
    const pdfUrl = doc.file_upload ? getDocumentDownloadUrl(doc.id) : '/sample.pdf'
    setSelectedPDF({
      url: pdfUrl,
      title: doc.tentang, // <-- title set to doc.tentang (exactly as requested)
    })
  }

  // DOWNLOAD using fetch -> blob so we can set filename to doc.tentang reliably
  const handleDownload = async (doc: Document) => {
    if (!doc.file_upload) {
      alert('File tidak tersedia.')
      return
    }

    try {
      const pdfUrl = getDocumentDownloadUrl(doc.id)
      const resp = await fetch(pdfUrl, { method: 'GET' })

      if (!resp.ok) throw new Error('Fetch gagal')

      const blob = await resp.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url

      // sanitize filename (basic) and fallback
      const safeName = (doc.tentang || 'dokumen')
        .replace(/[\/\\?%*:|"<>]/g, '-') // remove illegal chars
        .trim() || 'dokumen'

      a.download = `${safeName}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Gagal mengunduh file:', err)
      alert('Gagal mengunduh file.')
    }
  }

  if (loading) return <p className="text-gray-500">Memuat berita...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      {documents.map((doc) => {
        const tanggalDitetapkan =
          doc.tanggal_ditetapkan && doc.tanggal_ditetapkan !== '1970-01-01'
            ? formatDate(doc.tanggal_ditetapkan)
            : '-'

        const tanggalDiundangkan =
          doc.tanggal_diundangkan && doc.tanggal_diundangkan !== '1970-01-01'
            ? formatDate(doc.tanggal_diundangkan)
            : '-'

        const date = `${doc.nomor_ditetapkan ?? '-'} - ${tanggalDitetapkan}`
        const description = `${doc.nomor_diundangkan ?? '-'} - ${tanggalDiundangkan}`

        return (
          <div key={doc.id} className="block">
            <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start hover:shadow-lg transition">
              <div className="w-25 h-30 bg-green-100 rounded-md shrink-0 flex items-center justify-center overflow-hidden">
                <FileText className="w-10 h-10 text-green-600" strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{doc.tentang}</h3>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{date}</span>
                </div>

                <p
                  className="mt-4 text-gray-700 leading-relaxed"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {description}
                </p>

                {/* teks link Lihat & Unduh (tetap teks, bukan tombol besar) */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <button
                    onClick={() => handleView(doc)}
                    className="text-green-600 hover:text-green-700 font-medium transition"
                    type="button"
                  >
                    Lihat Dokumen
                  </button>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-green-600 hover:text-green-700 font-medium transition"
                    type="button"
                  >
                    Unduh Dokumen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {selectedPDF && (
        <PDFModal
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
          pdfUrl={selectedPDF.url}
          title={selectedPDF.title} // <-- akan menampilkan doc.tentang sebagai judul
        />
      )}
    </>
  )
}
