"use client"

import { useState } from "react"
import { Eye, Download, Check, X } from "lucide-react"
import { Button } from "@/components/kepala-desa/ui/button"
import { DownloadConfirmationDialog } from "@/components/kepala-desa/download-confirmation-dialog"
import { VerificationConfirmationDialog } from "@/components/kepala-desa/verification-confirmation-dialog"
import { PDFViewerModal } from "@/components/kepala-desa/pdf-viewer-modal"

interface VerificationDocument {
    id: number
    jenis: string
    nomorTanggalDitetapkan: string
    tentang: string
    tanggal: string
    nomor: string
    status: "loading" | "verified" | "pending" | "rejected"
    verificationDate?: string
    pdfUrl?: string
}

interface VerificationTableProps {
    documents: VerificationDocument[]
    isDocumentPage?: boolean
    onVerify?: (docId: number) => void
    onReject?: (docId: number) => void
}

export function VerificationTable({ documents, isDocumentPage = false, onVerify, onReject }: VerificationTableProps) {
    const [localDocs, setLocalDocs] = useState(documents)
    const [downloadConfirm, setDownloadConfirm] = useState<{ isOpen: boolean; docId: number | null }>({ isOpen: false, docId: null })
    const [verifyConfirm, setVerifyConfirm] = useState<{ isOpen: boolean; docId: number | null }>({ isOpen: false, docId: null })
    const [rejectConfirm, setRejectConfirm] = useState<{ isOpen: boolean; docId: number | null }>({ isOpen: false, docId: null })
    const [pdfViewer, setPdfViewer] = useState<{ isOpen: boolean; pdfUrl: string; docName: string }>({ isOpen: false, pdfUrl: "", docName: "" })

    // Handlers
    const handleDownloadClick = (docId: number) => setDownloadConfirm({ isOpen: true, docId })
    const handleVerifyClick = (docId: number) => setVerifyConfirm({ isOpen: true, docId })
    const handleRejectClick = (docId: number) => setRejectConfirm({ isOpen: true, docId })
    const handleViewClick = (doc: VerificationDocument) =>
        setPdfViewer({ isOpen: true, pdfUrl: doc.pdfUrl || "/placeholder.pdf", docName: `${doc.jenis} - ${doc.nomor}` })

    const handleDownloadConfirm = () => {
        const doc = localDocs.find(d => d.id === downloadConfirm.docId)
        if (doc) {
            const link = document.createElement("a")
            link.href = doc.pdfUrl || "/placeholder.pdf"
            link.download = `dokumen-${doc.nomor}.pdf`
            link.click()
        }
        setDownloadConfirm({ isOpen: false, docId: null })
    }

    const handleVerifyConfirm = () => {
        if (verifyConfirm.docId) {
            setLocalDocs(prev => prev.map(d => d.id === verifyConfirm.docId ? { ...d, status: "verified", verificationDate: new Date().toLocaleDateString() } : d))
            onVerify?.(verifyConfirm.docId)
        }
        setVerifyConfirm({ isOpen: false, docId: null })
    }

    const handleRejectConfirm = () => {
        if (rejectConfirm.docId) {
            setLocalDocs(prev => prev.map(d => d.id === rejectConfirm.docId ? { ...d, status: "rejected" } : d))

            onReject?.(rejectConfirm.docId)
        }
        setRejectConfirm({ isOpen: false, docId: null })
    }

    const filteredDocs = localDocs.filter(doc => doc.jenis || doc.nomorTanggalDitetapkan || doc.tentang || doc.tanggal || doc.nomor)

    const getStatusCell = (doc: VerificationDocument) => {
        if (isDocumentPage) {
            return (
                <div className="flex gap-2 items-center justify-center">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto" onClick={() => handleViewClick(doc)}>
                        <Eye size={18} />
                    </Button>
                    <Button size="sm" className="!bg-[#005B2F] hover:!bg-[#004626] text-white p-2 h-auto" onClick={() => handleDownloadClick(doc.id)}>
                        <Download size={18} />
                    </Button>
                </div>
            )
        }

        if (doc.status === "loading") {
            return (
                <div className="flex gap-2 items-center justify-center">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto" onClick={() => handleViewClick(doc)}>
                        <Eye size={18} />
                    </Button>
                    <Button size="sm" className="!bg-[#005B2F] hover:!bg-[#004626] text-white p-2 h-auto" onClick={() => handleDownloadClick(doc.id)}>
                        <Download size={18} />
                    </Button>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 h-auto" onClick={() => handleVerifyClick(doc.id)}>
                        <Check size={18} />
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto" onClick={() => handleRejectClick(doc.id)}>
                        <X size={18} />
                    </Button>
                </div>
            )
        }

        if (doc.status === "verified") {
            return <span className="text-gray-900 text-sm">Verifikasi {doc.verificationDate}</span>
        }

        if (doc.status === "rejected") {
            return <span className="text-red-600 text-sm font-semibold">Ditolak</span>
        }

        return null
    }

    return (
        <>
            <div className="overflow-x-auto overflow-y-auto max-h-fit">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#005B2F] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">JENIS</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR & TANGGAL DITETAPKAN</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TENTANG</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TANGGAL</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocs.map(doc => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.id}</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.jenis}</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.nomorTanggalDitetapkan}</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.tentang}</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.tanggal}</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.nomor}</td>
                                <td className="border border-gray-300 px-4 py-3 text-center">{getStatusCell(doc)}</td>
                            </tr>
                        ))}
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
            <VerificationConfirmationDialog
                isOpen={rejectConfirm.isOpen}
                onConfirm={handleRejectConfirm}
                onCancel={() => setRejectConfirm({ isOpen: false, docId: null })}
                documentName="dokumen (akan ditolak)"
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