"use client"
import { DocumentCard } from "@/components/kepala-desa/document-card"
import { SearchBar } from "@/components/kepala-desa/search-bar"
import { DocumentChart } from "@/components/kepala-desa/document-chart"
import { VerificationTable } from "@/components/kepala-desa/verification-table"
import { useDocuments } from "@/lib/contexts/documents-context"
import { JenisCard } from "@/components/kepala-desa/jenis-card"

import { useState, useMemo } from "react"

export default function DokumenPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const { documents, verifyDocument, declineDocument } = useDocuments()


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

    // Tambahkan fungsi handleVerify
    const handleVerify = (docId: number) => {
        const currentDate = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        verifyDocument(docId, currentDate)
        alert(`Dokumen berhasil diverifikasi pada ${currentDate} dan sekarang terlihat oleh publik!`);
    };

    const handleDecline = (docId: number) => {
        declineDocument(docId)
        alert(`Dokumen dengan ID ${docId} telah ditolak.`)
    }


    return (
        <main className="min-h-screen bg-gray-50">
            <div className="space-y-8" >
                {/* 🔹 Baris atas: tiga item sejajar */}
                <div className="grid md:grid-cols-3 gap-0 mb-12">


                    <DocumentCard />
                    <JenisCard />
                    <SearchBar
                        onSearch={setSearchQuery}
                        value={searchQuery}

                    />
                </div>



                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
                        <VerificationTable documents={filteredDocuments} onVerify={handleVerify} onDecline={handleDecline} />

                    </div>


                    <div className="12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Dokumen</h2>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <VerificationTable documents={filteredDocuments} isDocumentPage={true} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


