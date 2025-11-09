"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { DocumentCard } from "@/components/kepala-desa/document-card"
import { SearchBar } from "@/components/kepala-desa/search-bar"
import { VerificationTable } from "@/components/kepala-desa/verification-table"
import { DocumentChart } from "@/components/kepala-desa/document-chart"
import ArsipTabel from "@/components/kepala-desa/arsiptabel"
import TabelAktivitas from "@/components/kepala-desa/tabelaktivitas"
import { JenisCard } from "@/components/kepala-desa/jenis-card"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

const formatDateIndonesian = (date: Date): string => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch data dari backend (sama seperti di dokumen page)
  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_BASE_URL}/documents`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
        },
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("📦 Data dari API (Dashboard):", data)

      // Pastikan data adalah array
      const docsArray = Array.isArray(data) ? data : (data.data || [])
      setDocuments(docsArray)

      console.log(`✅ Loaded ${docsArray.length} documents`)
    } catch (error) {
      console.error("❌ Gagal fetch dokumen:", error)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentClick = () => {
    router.push("/dokumen")
  }

  const filteredDocuments = useMemo(() => {
    if (!Array.isArray(documents)) return []

    if (!searchQuery.trim()) {
      return documents
    }

    const query = searchQuery.toLowerCase()
    return documents.filter((doc) => {
      return (
        doc.tentang?.toLowerCase().includes(query) ||
        doc.nomor_ditetapkan?.toLowerCase().includes(query) ||
        doc.jenis_dokumen?.toLowerCase().includes(query)
      )
    })
  }, [searchQuery, documents])

  const handleVerify = async (docId: string) => {
    const currentDate = formatDateIndonesian(new Date())

    try {
      // Call API verify di VerificationTable
      // Setelah berhasil, refresh data
      await fetchDocuments()
      alert(`Dokumen berhasil diverifikasi pada ${currentDate} dan sekarang terlihat oleh publik!`)
    } catch (error) {
      console.error("Verifikasi gagal:", error)
    }
  }

  const handleDecline = async (docId: string) => {
    try {
      // Call API decline di VerificationTable
      // Setelah berhasil, refresh data
      await fetchDocuments()
      alert(`Dokumen dengan ID ${docId} telah ditolak.`)
    } catch (error) {
      console.error("Penolakan gagal:", error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="space-y-8">
        {/* Header Cards + Search */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-6 mb-12 items-center">
          <DocumentCard />
          <JenisCard />
          <SearchBar onSearch={setSearchQuery} value={searchQuery} />
        </div>

        {/* Chart */}
        <div className="mb-12">
          <DocumentChart documents={documents} />
        </div>

        {/* Verifikasi Dokumen Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>

          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500">Memuat dokumen...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <VerificationTable
                documents={documents}
                filterStatus={["Draft", "Ditolak"]}
                searchQuery={searchQuery}
                onVerify={handleVerify}
                onDecline={handleDecline}
              />
            </div>
          )}
        </div>

        {/* Arsip Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Arsip</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ArsipTabel />
          </div>
        </div>

        {/* Log Aktivitas Section */}
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