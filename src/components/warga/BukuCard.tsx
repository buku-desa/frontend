'use client'

import { useState } from 'react'
import { FileText, Download } from 'lucide-react'
import PDFModal from '@/components/PDFModal'
import { type Document, getDocumentDownloadUrl } from '@/lib/api/shared/documents'

interface BukuCardProps {
  doc: Document
}

export default function BukuCard({ doc }: BukuCardProps) {
  const [selectedPDF, setSelectedPDF] = useState<{
    url: string
    title: string
  } | null>(null)

  // Guard clause: jika doc undefined, jangan render
  if (!doc) {
    console.error('BukuCard: doc is undefined!')
    return null
  }

  console.log('BukuCard received doc:', doc)

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

  // Safe access dengan optional chaining
  const tanggalDitetapkan =
    doc?.tanggal_ditetapkan && doc.tanggal_ditetapkan !== '1970-01-01'
      ? formatDate(doc.tanggal_ditetapkan)
      : '-'

  const tanggalDiundangkan =
    doc?.tanggal_diundangkan && doc.tanggal_diundangkan !== '1970-01-01'
      ? formatDate(doc.tanggal_diundangkan)
      : '-'

  const date = `${doc?.nomor_ditetapkan ?? '-'} - ${tanggalDitetapkan}`
  const description = `${doc?.nomor_diundangkan ?? '-'} - ${tanggalDiundangkan}`

  const PDF_URL = getDocumentDownloadUrl(doc.id)

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start">
        <div className="w-25 h-30 bg-green-100 rounded-md shrink-0 flex items-center justify-center overflow-hidden">
          <FileText className="w-10 h-10 text-green-600" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold">{doc.tentang}</h3>

          <div className="text-sm text-gray-600 mt-2">{date}</div>

          <p className="text-gray-700 mt-3">{description}</p>

          {/* Action Buttons */}
          <div className="flex gap-6 mt-4 text-sm underline-offset-4">
            <button
              onClick={() => setSelectedPDF({ url: PDF_URL, title: doc.tentang })}
              className="text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              Lihat Dokumen
            </button>

            <a
              href={PDF_URL}
              download
              className="text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
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