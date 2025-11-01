"use client"

import { Button } from "@/components/shared/ui/button"

interface DeclineConfirmationDialogProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    documentName?: string
}

export function DeclineConfirmationDialog({
    isOpen,
    onConfirm,
    onCancel,
    documentName = "dokumen",
}: DeclineConfirmationDialogProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Konfirmasi Verifikasi</h3>
                <p className="text-gray-600 mb-6">
                    Apakah anda yakin ingin verifikasi {documentName} (akan ditolak)? Dokumen ini akan langsung terlihat oleh publik setelah diverifikasi.
                </p>
                <div className="flex gap-3 justify-end">
                    <Button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-900">
                        Tidak
                    </Button>
                    <Button onClick={onConfirm} className="bg-green-700 hover:bg-green-800 text-white">
                        Ya
                    </Button>
                </div>
            </div>
        </div>
    )
}
