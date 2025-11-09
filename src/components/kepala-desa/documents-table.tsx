"use client"
import { Eye, Download } from "lucide-react"
import { Button } from "@/components/shared/ui/button"

interface Document {
    id: string
    nomor_urut?: number
    jenis_dokumen: string
    nomor_ditetapkan?: string
    tanggal_ditetapkan?: string
    tentang: string
    status?: string
    file_url?: string
}

interface DocumentsTableProps {
    documents: Document[]
    isDocumentPage?: boolean
}

function formatText(text: string) {
    return text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatDate(dateStr?: string) {
    if (!dateStr) return "-"
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }
    return date.toLocaleDateString("id-ID", options)
}

export function DocumentsTable({ documents, isDocumentPage = false }: DocumentsTableProps) {
    const publishedDocs = documents.filter(
        (doc) => doc.status?.toLowerCase() === "disetujui"
    )

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-green-800 text-white">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">JENIS</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR & TANGGAL DITETAPKAN</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TENTANG</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TANGGAL</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    {publishedDocs.length > 0 ? (
                        publishedDocs.map((doc, index) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-3">{formatText(doc.jenis_dokumen)}</td>
                                <td className="border border-gray-300 px-4 py-3">
                                    {doc.nomor_ditetapkan ? `${doc.nomor_ditetapkan} / ${formatDate(doc.tanggal_ditetapkan)}` : "-"}
                                </td>
                                <td className="border border-gray-300 px-4 py-3">{doc.tentang || "-"}</td>
                                <td className="border border-gray-300 px-4 py-3">{formatDate(doc.tanggal_ditetapkan)}</td>
                                <td className="border border-gray-300 px-4 py-3">
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-green-200 hover:bg-green-100 text-green-700 p-2 h-auto"
                                            onClick={() => window.open(doc.file_url, "_blank")}
                                        >
                                            <Eye size={18} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                                            onClick={() => window.open(doc.file_url, "_blank")}
                                        >
                                            <Download size={18} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                                Tidak ada dokumen ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
