"use client"

import { useState, useMemo } from "react"
import { Eye, Download, Check, X } from "lucide-react"
import { Button } from "@/components/shared/ui/button"
import { DownloadConfirmationDialog } from "@/components/kepala-desa/download-confirmation-dialog"
import { VerificationConfirmationDialog } from "@/components/kepala-desa/verification-confirmation-dialog"
import { DeclineConfirmationDialog } from "@/components/kepala-desa/decline-confirmation-dialog"
import { PDFViewerModal } from "@/components/kepala-desa/pdf-viewer-modal"

// 🔹 Helper function untuk ubah header
function formatHeader(text: string) {
    return text
        .replace(/_/g, " ")            // ganti underscore dengan spasi
        .replace(/\b\w/g, (c) => c.toUpperCase()) // kapitalisasi tiap kata
}

interface VerificationDocument {
    id: string
    jenis_dokumen: string
    nomor_ditetapkan?: string
    tanggal_ditetapkan?: string
    tentang: string
    status?: "loading" | "verified" | "pending" | "declined" | "Draft"
    verificationDate?: string
    file_url?: string
}

interface VerificationTableProps {
    documents: VerificationDocument[]
    isDocumentPage?: boolean
    onVerify?: (docId: string) => void
    onDecline?: (docId: string) => void
    searchQuery?: string
}

export function VerificationTable({
    documents,
    isDocumentPage = false,
    onVerify,
    onDecline,
    searchQuery = "",
}: VerificationTableProps) {
    const [downloadConfirm, setDownloadConfirm] = useState<{ isOpen: boolean; docId: string | null }>({
        isOpen: false,
        docId: null,
    })
    const [verifyConfirm, setVerifyConfirm] = useState<{ isOpen: boolean; docId: string | null }>({
        isOpen: false,
        docId: null,
    })
    const [declineConfirm, setDeclineConfirm] = useState<{ isOpen: boolean; docId: string | null }>({
        isOpen: false,
        docId: null,
    })
    const [pdfViewer, setPdfViewer] = useState<{ isOpen: boolean; pdfUrl: string; docName: string }>({
        isOpen: false,
        pdfUrl: "",
        docName: "",
    })

    // 🔹 Handlers
    // 🔹 Download dari API
    const handleDownloadConfirm = async () => {
        const doc = documents.find(d => d.id === downloadConfirm.docId)
        if (!doc) return

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`/api/documents/${doc.id}/download`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `dokumen-${doc.nomor_ditetapkan || doc.id}.pdf`
            link.click()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Download gagal", error)
        }

        setDownloadConfirm({ isOpen: false, docId: null })
    }

    // Verifikasi dokumen
    const handleVerifyConfirm = async () => {
        if (!verifyConfirm.docId) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/documents/${verifyConfirm.docId}/approve`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 🔹 kirim cookie sanctum
            });
            if (!response.ok) {
                console.error("Error status:", response.status, response.statusText);
                throw new Error("Verifikasi gagal");
            }
            alert("Dokumen berhasil diverifikasi");
            onVerify?.(verifyConfirm.docId);
        } catch (error) {
            console.error(error);
            alert("Gagal verifikasi dokumen");
        }
        setVerifyConfirm({ isOpen: false, docId: null });
    };

    const handleDeclineConfirm = async () => {
        if (!declineConfirm.docId) return;
        try {
            const response = await fetch(`http://localhost:8000/api/documents/${declineConfirm.docId}/reject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ reason: "Dokumen ditolak" }),
            });
            if (!response.ok) throw new Error("Penolakan gagal");
            alert("Dokumen berhasil ditolak");
            onDecline?.(declineConfirm.docId);
        } catch (error) {
            console.error(error);
            alert("Gagal menolak dokumen");
        }
        setDeclineConfirm({ isOpen: false, docId: null });
    }


    // 🔹 Lihat PDF tetap sama
    const handleViewClick = (doc: VerificationDocument) => {
        setPdfViewer({
            isOpen: true,
            pdfUrl: doc.file_url || "/placeholder.pdf",
            docName: `${doc.jenis_dokumen} - ${doc.nomor_ditetapkan || doc.id}`,
        })
    }


    // 🔹 Filter dokumen
    const filteredDocs = useMemo(() => {
        // Ambil dokumen yang statusnya Draft
        let draftDocs = documents.filter(doc => doc.status === "Draft")

        const query = searchQuery.toLowerCase().trim()
        if (!query) return draftDocs
        return draftDocs.filter(
            (doc) =>
                doc.jenis_dokumen.toLowerCase().includes(query) ||
                (doc.nomor_ditetapkan?.toLowerCase().includes(query) ?? false) ||
                doc.tentang.toLowerCase().includes(query)
        )
    }, [documents, searchQuery])




    // 🔹 Status cell
    const getStatusCell = (doc: VerificationDocument) => {
        const status = doc.status || "pending"

        // Tombol selalu muncul di halaman Dokumen Kepala Desa
        if (isDocumentPage || status === "loading" || status === "Draft") {
            return (
                <div className="flex gap-2 items-center justify-center">
                    <Button size="sm" className="bg-green-100 hover:bg-green-200 text-green-700 p-2 h-auto" onClick={() => handleViewClick(doc)}>
                        <Eye size={18} />
                    </Button>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto" onClick={() => setDownloadConfirm({ isOpen: true, docId: doc.id })}>
                        <Download size={18} />
                    </Button>
                    {!isDocumentPage && status !== "verified" && status !== "declined" && (
                        <>
                            <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 h-auto" onClick={() => setVerifyConfirm({ isOpen: true, docId: doc.id })}>
                                <Check size={18} />
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto" onClick={() => setDeclineConfirm({ isOpen: true, docId: doc.id })}>
                                <X size={18} />
                            </Button>
                        </>
                    )}
                </div>

            )
        }

        if (status === "verified") {
            return <span className="text-gray-900 text-sm">Verifikasi {doc.verificationDate}</span>
        }

        if (status === "declined") {
            return <span className="text-red-600 text-sm font-semibold">Ditolak</span>
        }

        return <span className="text-gray-500 text-sm italic">Pending</span>
    }

    // 🔹 Header array
    const headers = ["no", "jenis_dokumen", "nomor_ditetapkan", "tentang", "tanggal_ditetapkan", "nomor_ditetapkan", "status"]

    return (
        <>
            <div className="overflow-x-auto max-h-fit">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-green-800 text-white">
                            {headers.map((header) => (
                                <th key={header} className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    {formatHeader(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map((doc, index) => (
                                <tr key={doc.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.jenis_dokumen}</td>
                                    <td className="border border-gray-300 px-4 py-3 text-gray-900">
                                        {doc.nomor_ditetapkan ? `${doc.nomor_ditetapkan} / ${doc.tanggal_ditetapkan}` : "-"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.tentang}</td>
                                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.tanggal_ditetapkan || "-"}</td>
                                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.nomor_ditetapkan || "-"}</td>
                                    <td className="border border-gray-300 px-4 py-3 text-center">{getStatusCell(doc)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="text-center py-6 text-gray-500 italic">
                                    Tidak ada dokumen ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <DownloadConfirmationDialog
                isOpen={downloadConfirm.isOpen}
                onConfirm={handleDownloadConfirm}
                onCancel={() => setDownloadConfirm({ isOpen: false, docId: null })}
                documentName="dokumen"
            />
            <VerificationConfirmationDialog
                isOpen={verifyConfirm.isOpen}
                onConfirm={handleVerifyConfirm}
                onCancel={() => setVerifyConfirm({ isOpen: false, docId: null })}
                documentName="dokumen"
            />
            <DeclineConfirmationDialog
                isOpen={declineConfirm.isOpen}
                onConfirm={handleDeclineConfirm}
                onCancel={() => setDeclineConfirm({ isOpen: false, docId: null })}
                documentName="dokumen"
            />
            <PDFViewerModal
                isOpen={pdfViewer.isOpen}
                onClose={() => setPdfViewer({ isOpen: false, pdfUrl: "", docName: "" })}
                pdfUrl={pdfViewer.pdfUrl}
                documentName={pdfViewer.docName}
            />
        </>
    )
}
