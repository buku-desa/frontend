"use client"

import { useState, useMemo } from "react"
import axios from "axios"
import { Eye, Download, Check, X } from "lucide-react"
import { Button } from "@/components/shared/ui/button"
import { DownloadConfirmationDialog } from "@/components/kepala-desa/download-confirmation-dialog"
import { VerificationConfirmationDialog } from "@/components/kepala-desa/verification-confirmation-dialog"
import { DeclineConfirmationDialog } from "@/components/kepala-desa/decline-confirmation-dialog"
import { PDFViewerModal } from "@/components/kepala-desa/pdf-viewer-modal"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

// 🔹 Helper format teks: ganti _ dengan spasi + kapital tiap kata
function formatText(text: string) {
    return text
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
}

// 🔹 Helper format tanggal: 2001-04-21 → 21 April 2001
function formatDate(dateString?: string) {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

interface VerificationDocument {
    id: string
    jenis_dokumen: string
    nomor_ditetapkan?: string
    tanggal_ditetapkan?: string
    tentang: string
    status?: "Draft" | "Disetujui" | "Ditolak" | "Diarsipkan"
    verificationDate?: string
    file_url?: string
}

interface VerificationTableProps {
    documents: VerificationDocument[]
    isDocumentPage?: boolean
    onVerify?: (docId: string) => void
    onDecline?: (docId: string) => void
    searchQuery?: string
    filterStatus?: string[] // ⬅️ Tambahkan baris ini
}


export function VerificationTable({
    documents,
    isDocumentPage = false,
    onVerify,
    onDecline,
    searchQuery = "",
    filterStatus = ["Draft"],
}: VerificationTableProps) {
    // 🔹 DEBUG: Lihat apa yang masuk
    console.log("📊 Documents received:", documents.length)
    console.log("🔍 Filter status:", filterStatus)
    console.log("📝 Search query:", searchQuery)
    console.log("📄 Is document page:", isDocumentPage)

    const [downloadConfirm, setDownloadConfirm] = useState({ isOpen: false, docId: null as string | null })
    const [verifyConfirm, setVerifyConfirm] = useState({ isOpen: false, docId: null as string | null })
    const [declineConfirm, setDeclineConfirm] = useState({ isOpen: false, docId: null as string | null })
    const [pdfViewer, setPdfViewer] = useState({ isOpen: false, pdfUrl: "", docName: "" })

    // 🔹 DOWNLOAD FILE
    const handleDownloadConfirm = async () => {
        const doc = documents.find((d) => d.id === downloadConfirm.docId)
        if (!doc) return

        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${API_BASE_URL}/documents/${doc.id}/download`, {
                responseType: "blob",
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            })

            const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `dokumen-${doc.nomor_ditetapkan || doc.id}.pdf`
            link.click()
            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.error("Download gagal:", error)
            alert("Gagal mengunduh dokumen.")
        }

        setDownloadConfirm({ isOpen: false, docId: null })
    }

    // 🔹 VERIFIKASI DOKUMEN
    const handleVerifyConfirm = async () => {
        if (!verifyConfirm.docId) return
        try {
            const token = localStorage.getItem("token")
            await axios.put(
                `${API_BASE_URL}/documents/${verifyConfirm.docId}/approve`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                        Accept: "application/json",
                    },
                }
            )
            alert("✅ Dokumen berhasil diverifikasi")
            onVerify?.(verifyConfirm.docId)
        } catch (error) {
            console.error("Verifikasi gagal:", error)
            alert("Gagal memverifikasi dokumen.")
        }
        setVerifyConfirm({ isOpen: false, docId: null })
    }

    // 🔹 TOLAK DOKUMEN
    const handleDeclineConfirm = async () => {
        if (!declineConfirm.docId) return
        try {
            const token = localStorage.getItem("token")
            await axios.post(
                `${API_BASE_URL}/documents/${declineConfirm.docId}/reject`,
                { catatan: "Dokumen ditolak" },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                        "Content-Type": "application/json",
                    },
                }
            )
            alert("❌ Dokumen berhasil ditolak")
            onDecline?.(declineConfirm.docId)
        } catch (error) {
            console.error("Penolakan gagal:", error)
            alert("Gagal menolak dokumen.")
        }
        setDeclineConfirm({ isOpen: false, docId: null })
    }

    // 🔹 LIHAT PDF
    const handleViewClick = (doc: VerificationDocument) => {
        setPdfViewer({
            isOpen: true,
            pdfUrl: doc.file_url || `${API_BASE_URL}/documents/${doc.id}`,
            docName: `${formatText(doc.jenis_dokumen)} - ${doc.nomor_ditetapkan || doc.id}`,
        })
    }

    // 🔹 FILTER DOKUMEN (HANYA DRAFT)
    const filteredDocs = useMemo(() => {
        const query = searchQuery.toLowerCase().trim()

        let docsToShow = documents.filter((doc) =>
            (filterStatus ?? ["Draft"]).includes(doc.status ?? "")
        )

        console.log("✅ Filtered docs:", docsToShow.length, docsToShow)

        if (!query) return docsToShow

        return docsToShow.filter(
            (doc) =>
                doc.jenis_dokumen.toLowerCase().includes(query) ||
                (doc.nomor_ditetapkan?.toLowerCase().includes(query) ?? false) ||
                doc.tentang.toLowerCase().includes(query)
        )
    }, [documents, searchQuery, filterStatus])




    // 🔹 STATUS CELL
    const getStatusCell = (doc: VerificationDocument) => {
        const status = doc.status || "Draft"

        if (isDocumentPage || status === "Draft") {
            return (
                <div className="flex gap-2 items-center justify-center">
                    <Button
                        size="sm"
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 h-auto"
                        onClick={() => handleViewClick(doc)}
                    >
                        <Eye size={18} />
                    </Button>
                    {!isDocumentPage && status === "Disetujui" && (
                        <>
                            <Button
                                size="sm"
                                className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                                onClick={() => setDownloadConfirm({ isOpen: true, docId: doc.id })}
                            >
                                <Download size={18} />
                            </Button> */
                        </>
                    )}

                    {/* <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                        onClick={() => setDownloadConfirm({ isOpen: true, docId: doc.id })}
                    >
                        <Download size={18} />
                    </Button> */}

                    {/* Tombol verifikasi & tolak hanya untuk draft */}
                    {!isDocumentPage && status === "Draft" && (
                        <>
                            <Button
                                size="sm"
                                className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                                onClick={() => setVerifyConfirm({ isOpen: true, docId: doc.id })}
                            >
                                <Check size={18} />
                            </Button>
                            <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto"
                                onClick={() => setDeclineConfirm({ isOpen: true, docId: doc.id })}
                            >
                                <X size={18} />
                            </Button>
                        </>
                    )}
                </div>
            )
        }

        if (status === "Disetujui") {
            return <span className="text-green-700 text-sm font-semibold">Disetujui</span>
        }

        if (status === "Ditolak") {
            return <span className="text-red-600 text-sm font-semibold">Ditolak</span>
        }

        if (status === "Diarsipkan") {
            return <span className="text-blue-700 text-sm font-semibold">Diarsipkan</span>
        }

        // 🔹 Fallback jika status tidak dikenal
        return <span className="text-gray-500 text-sm italic">Status Tidak Dikenal</span>
    }


    // 🔹 HEADER
    const headers = ["No", "Jenis Dokumen", "Nomor Ditetapkan", "Tentang", "Tanggal Ditetapkan", "Status"]

    return (
        <>
            <div className="overflow-x-auto max-h-fit">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-green-800 text-white">
                            {headers.map((header) => (
                                <th key={header} className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    {formatText(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map((doc, index) => (
                                <tr key={doc.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-3">{formatText(doc.jenis_dokumen)}</td>
                                    <td className="border border-gray-300 px-4 py-3">{doc.nomor_ditetapkan || "-"}</td>
                                    <td className="border border-gray-300 px-4 py-3">{doc.tentang}</td>
                                    <td className="border border-gray-300 px-4 py-3">{formatDate(doc.tanggal_ditetapkan)}</td>
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

            {/* Dialog */}
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
