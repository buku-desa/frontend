"use client"

import { X } from "lucide-react"
import { Button } from "@/components/shared/ui/button"

interface PDFViewerModalProps {
    isOpen: boolean
    onClose: () => void
    pdfUrl?: string
    documentName?: string
}

export function PDFViewerModal({
    isOpen,
    onClose,
    pdfUrl = "/placeholder.pdf",
    documentName = "Dokumen",
}: PDFViewerModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{documentName}</h3>
                    <Button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 h-auto">
                        <X size={20} />
                    </Button>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 overflow-auto">
                    <iframe src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`} className="w-full h-full" title={documentName} />
                </div>
            </div>
        </div>
    )
}
