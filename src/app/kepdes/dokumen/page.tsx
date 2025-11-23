"use client"

import { useState, useEffect, useMemo } from "react"
import { DocumentCard } from "@/components/kepala-desa/document-card"
import { SearchBar } from "@/components/kepala-desa/search-bar"
import { VerificationTable } from "@/components/kepala-desa/verification-table"
import { JenisCard } from "@/components/kepala-desa/jenis-card"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DokumenPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [documents, setDocuments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // 🔹 Fetch data dari backend Laravel
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await fetch(`${API_URL}/documents`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                        Accept: "application/json",
                    },
                })
                const data = await res.json()
                console.log("📦 Data dari API:", data) // Debug
                setDocuments(data.data || [])
            } catch (error) {
                console.error("❌ Gagal fetch dokumen:", error)
                setDocuments([])
            } finally {
                setLoading(false)
            }
        }
        fetchDocuments()
    }, [])

    const handleVerify = async (docId: string) => {
        // Refresh data setelah verify
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/documents`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json",
            },
        })
        const data = await res.json()
        setDocuments(data.data || [])
    }

    const handleDecline = async (docId: string) => {
        // Refresh data setelah decline
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/documents`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json",
            },
        })
        const data = await res.json()
        setDocuments(data.data || [])
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="space-y-8">
                {/* Action Cards */}
                <div className="flex flex-col md:flex-row gap-6">
                    <DocumentCard />
                    <JenisCard />
                </div>

                {/* Search Bar */}
                <div>
                    <SearchBar onSearch={setSearchQuery} value={searchQuery} />
                </div>

                {/* Verifikasi Dokumen Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
                        <VerificationTable
                            documents={documents}
                            filterStatus={["Draft", "Ditolak"]}
                            searchQuery={searchQuery}
                            onVerify={handleVerify}
                            onDecline={handleDecline}
                        />
                    </div>

                    {/* Dokumen Disetujui Section */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Dokumen Disetujui</h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <VerificationTable
                            documents={documents}
                            filterStatus={["Disetujui"]}
                            searchQuery={searchQuery}
                            isDocumentPage={true}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}