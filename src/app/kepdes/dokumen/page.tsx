"use client"

import { useState, useEffect, useMemo } from "react"
import { DocumentCard } from "@/components/kepala-desa/document-card"
import { SearchBar } from "@/components/kepala-desa/search-bar"
import { DocumentChart } from "@/components/kepala-desa/document-chart"
import { VerificationTable } from "@/components/kepala-desa/verification-table"
import { JenisCard } from "@/components/kepala-desa/jenis-card"

export default function DokumenPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [documents, setDocuments] = useState<any[]>([])

    // 🔹 Fetch data dari backend Laravel
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/documents")
                const data = await res.json()
                setDocuments(data.data)
            } catch (error) {
                console.error("Gagal fetch dokumen:", error)
            }
        }
        fetchDocuments()
    }, [])

    const filteredDocuments = useMemo(() => {
        if (!searchQuery.trim()) return documents
        const query = searchQuery.toLowerCase()
        return documents.filter((doc) =>
            doc.tentang?.toLowerCase().includes(query) ||
            doc.nomor_ditetapkan?.toLowerCase().includes(query) ||
            doc.jenis_dokumen?.toLowerCase().includes(query)
        )

    }, [searchQuery, documents])

    const handleVerify = (docId: string) => {
        alert(`Dokumen dengan ID ${docId} berhasil diverifikasi!`)
    }

    const handleDecline = (docId: string) => {
        alert(`Dokumen dengan ID ${docId} ditolak!`)
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <DocumentCard />
                    <JenisCard />
                </div>

                <div>
                    <SearchBar onSearch={setSearchQuery} value={searchQuery} />
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
                        <VerificationTable
                            documents={filteredDocuments}
                            onVerify={handleVerify}
                            onDecline={handleDecline}
                        />
                    </div>

                    <div className="12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Dokumen</h2>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <VerificationTable
                                documents={filteredDocuments}
                                isDocumentPage={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
