"use client"
import { useEffect, useState } from "react"
import { Eye, Download } from "lucide-react"
import { Button } from "@/components/shared/ui/button"


interface Document {
    id: string                   // UUID dari Laravel
    nomor_urut?: number          // opsional
    jenis_dokumen: string        // dulu 'jenis'
    nomor_ditetapkan?: string    // dulu 'nomor'
    tanggal_ditetapkan?: string  // dulu 'tanggal'
    tentang: string
    status?: string
    file_url?: string
}

export function DocumentsTable() {
    const [documents, setDocuments] = useState<Document[]>([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/documents")
            .then((res) => res.json())
            .then((data) => setDocuments(data.data))

            .catch((err) => console.error("Gagal memuat dokumen:", err))
    }, [])

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
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.length > 0 ? (
                        documents.map((doc, index) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.jenis_dokumen || "-"}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.nomor_ditetapkan ? `${doc.nomor_ditetapkan} / ${doc.tanggal_ditetapkan}` : "-"}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.tentang || "-"}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.tanggal_ditetapkan || "-"}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.nomor_ditetapkan || "-"}</td>
                                <td className="border border-gray-300 px-4 py-3">
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-green-200 hover:bg-green-100 text-green-700 p-2 h-auto"
                                            onClick={() => window.open(`http://127.0.0.1:8000/api/documents/${doc.id}`, "_blank")}
                                        >
                                            <Eye size={18} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                                            onClick={() => window.open(`http://127.0.0.1:8000/api/documents/${doc.id}/download`, "_blank")}
                                        >
                                            <Download size={18} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                                Tidak ada dokumen ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
