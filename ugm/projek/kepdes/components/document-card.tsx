"use client"

import { FileText } from "lucide-react"

interface DocumentCardProps {
    total: number
    onClick?: () => void
}

export function DocumentCard({ total, onClick }: DocumentCardProps) {
    return (
        <div
            onClick={onClick}
            className="border-2 border-gray-400 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white w-fit"
        >
            <div className="flex items-center gap-4">
                <div className="bg-black p-2 rounded-lg flex-shrink-0">
                    <FileText className="text-white" size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Dokumen</h3>
                    <p className="text-gray-700 mt-1 text-sm">Total : {total}</p>
                </div>
            </div>
        </div>
    )
}
