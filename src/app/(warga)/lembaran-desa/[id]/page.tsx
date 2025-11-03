"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import PDFModal from "@/components/PDFModal"

// === PDF Viewer (buku-lembaran-pdf) ===
// ubah path import ke lokasi baru
const BukuLembaranPDF = dynamic(
  () => import('../../buku-lembaran-pdf'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8">
          <p className="text-lg text-gray-700">Memuat PDF Viewer...</p>
        </div>
      </div>
    )
  }
)

// --- SVG Ikon Inline (Pengganti Lucide) ---
const IconFileText = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 8 9 8 11" />
  </svg>
)
const IconCalendar = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const IconDownload = (props: { className?: string }) => (
  <svg className={props.className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
  </svg>
)
const IconEye = (props: { className?: string }) => (
  <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)
const IconArrowLeft = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)
// --- Akhir SVG Ikon Inline ---


// Mock data (nanti dari API berdasarkan ID)
const getBukuById = (id: string) => {
  const allData = [
    {
      id: 1,
      title: 'PERATURAN KALURAHAN TENTANG RKP DESA Sendangsari 2022 NO.6',
      date: '2022',
      description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id.',
      downloads: 124,
      pdfUrl: '/sample.pdf',
      jenis: 'Peraturan',
      nomor: 'NO.6/2022',
      tentang: 'RKP Desa Sendangsari Tahun 2022',
      status: 'Aktif',
    },
    {
      id: 2,
      title: 'PERKAL NO.1 TAHUN 2022 LAPORAN PERTANGGUNGJAWABAN',
      date: '2023',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      downloads: 89,
      pdfUrl: '/sample.pdf',
      jenis: 'Peraturan',
      nomor: 'NO.1/2023',
      tentang: 'Laporan Pertanggungjawaban',
      status: 'Aktif',
    },
  ]
  return allData.find((item) => item.id === parseInt(id))
}

export default function DetailDokumen() {
  const [docId, setDocId] = useState<string>('1') // ← default ID = 1
  const [showPDFModal, setShowPDFModal] = useState(false)

  const dokumen = docId ? getBukuById(docId) : null

  if (!dokumen) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Dokumen tidak ditemukan
        </h1>
        <a href="/lembaran-desa" className="text-green-600 hover:text-green-700">
          ← Kembali ke Daftar Dokumen
        </a>
      </div>
    )
  }

  const handleDownload = () => {
    if (!dokumen?.pdfUrl) return
    const link = document.createElement('a')
    link.href = dokumen.pdfUrl
    link.download = `${dokumen.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 pt-16">
      <a href="/lembaran-desa" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
        <IconArrowLeft />
        Kembali ke Daftar Dokumen
      </a>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <IconFileText />
            </div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-2">
                {dokumen.jenis}
              </span>
              <h1 className="text-2xl font-bold mb-2">{dokumen.title}</h1>
              <div className="flex items-center gap-4 text-sm text-green-100">
                <div className="flex items-center gap-1">
                  <IconCalendar />
                  <span>{dokumen.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconDownload />
                  <span>{dokumen.downloads} downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Nomor Dokumen</p>
              <p className="font-semibold text-gray-900">{dokumen.nomor}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                {dokumen.status}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tentang</h3>
            <p className="text-gray-700 leading-relaxed">{dokumen.tentang}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
            <p className="text-gray-700 leading-relaxed">{dokumen.description}</p>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowPDFModal(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <IconEye className="w-5 h-5" />
              Lihat Dokumen
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <IconDownload className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <PDFModal
  isOpen={true}
  onClose={() => console.log("closed")}
  pdfUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  title="Lembaran Desa"
/>

    </main>
  )
}
