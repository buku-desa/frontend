"use client"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/kepala-desa/header"
import { DocumentCard } from "@/components/kepala-desa/document-card"
import { SearchBar } from "@/components/kepala-desa/search-bar"
import { VerificationTable } from "@/components/kepala-desa/verification-table"
import { DocumentChart } from "@/components/kepala-desa/document-chart"
import { useDocuments } from "@/lib/contexts/documents-context"
import ArsipTabel from "@/components/kepala-desa/arsiptabel"
import TabelAktivitas from "@/components/kepala-desa/tabelaktivitas"

import { useState } from "react"

const formatDateIndonesian = (date: Date): string => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const { documents, verifyDocument, declineDocument } = useDocuments()


  const handleDocumentClick = () => {
    router.push("/dokumen")
  }

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) {
      return documents
    }

    const query = searchQuery.toLowerCase()
    return documents.filter((doc) => {
      return (
        doc.tentang.toLowerCase().includes(query) ||
        doc.nomor.toLowerCase().includes(query) ||
        doc.jenis.toLowerCase().includes(query)
      )
    })
  }, [searchQuery, documents])

  const handleVerify = (docId: number) => {
    const currentDate = formatDateIndonesian(new Date())
    verifyDocument(docId, currentDate)
    alert(`Dokumen berhasil diverifikasi pada ${currentDate} dan sekarang terlihat oleh publik!`)
  }

  const handleDecline = (docId: number) => {
    declineDocument(docId)
    alert(`Dokumen dengan ID ${docId} telah ditolak.`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <DocumentCard />
          <SearchBar onSearch={setSearchQuery} value={searchQuery} />
        </div>

        <div className="mb-12">
          <DocumentChart />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <VerificationTable documents={filteredDocuments} onVerify={handleVerify} onDecline={handleDecline} />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Arsip</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ArsipTabel />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Log Aktivitas</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <TabelAktivitas />
          </div>
        </div>

      </div>
    </main>
  )
}
