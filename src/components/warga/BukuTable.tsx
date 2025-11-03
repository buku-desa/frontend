'use client'

import { useState } from 'react'
import PDFModal from '@/components/PDFModal' // Sesuaikan path-nya
import { Eye, Download } from 'lucide-react'

type Row = { 
  no: number
  judul: string
  jenis: string
  tahun: number
  pdfUrl?: string // Tambahkan field pdfUrl (opsional, nanti dari API)
}

export default function BukuTable({ rows }: { rows: Row[] }) {
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null)

  // Handler untuk view PDF
  const handleView = (row: Row) => {
    // Sementara pakai dummy PDF URL, nanti ganti dengan row.pdfUrl dari API
    const pdfUrl = row.pdfUrl || '/sample.pdf' // Ganti dengan PDF asli
    setSelectedPDF({
      url: pdfUrl,
      title: row.judul
    })
  }

  // Handler untuk download PDF
  const handleDownload = (row: Row) => {
    const pdfUrl = row.pdfUrl || '/sample.pdf' // Ganti dengan PDF asli
    
    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${row.judul}.pdf` // Nama file saat di-download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">NO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">JUDUL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">JENIS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">TAHUN</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{item.no}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.judul}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-700">
                      {item.jenis}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tahun}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-center">
                      {/* Button View */}
                      <button 
                        onClick={() => handleView(item)}
                        className="bg-green-100 text-green- p-2 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 group"
                        title="Lihat Dokumen"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-xs hidden sm:inline">Lihat</span>
                      </button>
                      
                      {/* Button Download */}
                      <button 
                        onClick={() => handleDownload(item)}
                        className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-800 transition-colors flex items-center gap-1 group"
                        title="Download Dokumen"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-xs hidden sm:inline">Unduh</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {rows.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Tidak ada dokumen tersedia</p>
          </div>
        )}
      </div>

      {/* PDF Modal */}
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