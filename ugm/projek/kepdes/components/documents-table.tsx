import { Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VerificationTable } from "@/components/verification-table"


interface Document {
    id: number
    jenis: string
    nomorTanggalDitetapkan: string
    tentang: string
    tanggal: string
    nomor: string
}

interface DocumentsTableProps {
    documents: Document[]
}

export function DocumentsTable({ documents }: DocumentsTableProps) {
    return (

        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>

                    <tr className="bg-[#005B2F] !text-white !bg-[#005B2F]">

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
                    {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3">{doc.id}</td>
                            <td className="border border-gray-300 px-4 py-3">{doc.jenis}</td>
                            <td className="border border-gray-300 px-4 py-3">{doc.nomorTanggalDitetapkan}</td>
                            <td className="border border-gray-300 px-4 py-3">{doc.tentang}</td>
                            <td className="border border-gray-300 px-4 py-3">{doc.tanggal}</td>
                            <td className="border border-gray-300 px-4 py-3">{doc.nomor}</td>
                            <td className="border border-gray-300 px-4 py-3">
                                <div className="flex gap-2">
                                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto">
                                        <Eye size={18} />
                                    </Button>
                                    <Button size="sm" className="!bg-[#005B2F] hover:!bg-[#004626] text-white p-2 h-auto">

                                        <Download size={18} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
