"use client"
import { Header } from "@/components/kepala-desa/header"
import { DocumentCard } from "@/components/kepala-desa/document-card"
import { SearchBar } from "@/components/kepala-desa/search-bar"
import { DocumentChart } from "@/components/kepala-desa/document-chart"
import { VerificationTable } from "@/components/kepala-desa/verification-table"
import { useDocuments } from "../context/documents-context"
import { useState, useMemo } from "react"

export default function DokumenPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const { documents, verifyDocument } = useDocuments()


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



    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" >
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <DocumentCard />
                    <SearchBar onSearch={setSearchQuery} value={searchQuery} />
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>
                    Total dokumen: {filteredDocuments.length}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
                        <VerificationTable documents={filteredDocuments} onVerify={handleVerify} />

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