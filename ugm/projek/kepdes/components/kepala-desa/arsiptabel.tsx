// components/tabel-arsip.tsx
"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/kepala-desa/ui/button";
import { PDFViewerModal } from "@/components/pdf-viewer-modal";

interface ArchivedDocument {
    id: number;
    jenis: string;
    nomorTanggalDitetapkan: string;
    tentang: string;
    tanggal: string;
    nomor: string;
    pdfUrl?: string;
}

interface TabelArsipProps {
    documents?: ArchivedDocument[];
}

export default function TabelArsip({ documents }: TabelArsipProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
    const [selectedPDF, setSelectedPDF] = useState<string>("");
    const [selectedTitle, setSelectedTitle] = useState<string>("");

    const defaultDocuments: ArchivedDocument[] = documents || [
        {
            id: 1,
            jenis: "Peraturan",
            nomorTanggalDitetapkan: "17 Agustus 2024",
            tentang: "Peraturan Desa Tentang Pengelolaan Keuangan",
            tanggal: "17 Agustus 2024",
            nomor: "01",
            pdfUrl: "/sample.pdf",
        },
        {
            id: 2,
            jenis: "Peraturan",
            nomorTanggalDitetapkan: "01 Maret 2025",
            tentang: "Peraturan Tentang Rencana Pembangunan",
            tanggal: "01 Maret 2025",
            nomor: "02",
            pdfUrl: "/sample.pdf",
        },
        {
            id: 3,
            jenis: "Peraturan",
            nomorTanggalDitetapkan: "30 Juli 2025",
            tentang: "Peraturan Tentang Pajak Desa",
            tanggal: "30 Juli 2025",
            nomor: "03",
            pdfUrl: "/sample.pdf",
        },
    ];

    const handleViewDocument = (doc: ArchivedDocument) => {
        if (doc.pdfUrl) {
            setSelectedPDF(doc.pdfUrl);
            setSelectedTitle(`${doc.jenis} - ${doc.tentang}`);
            setIsPDFModalOpen(true);
        }
    };

    const filteredDocs = defaultDocuments.filter((doc) =>
        [doc.jenis, doc.nomor, doc.tentang].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#005B2F] text-white">
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
                        {filteredDocs.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="border border-gray-300 px-4 py-3">{doc.id}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.jenis}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.nomorTanggalDitetapkan}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.tentang}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.tanggal}</td>
                                <td className="border border-gray-300 px-4 py-3">{doc.nomor}</td>
                                <td className="border border-gray-300 px-4 py-3">
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto"
                                            onClick={() => handleViewDocument(doc)}
                                        >
                                            <Eye size={18} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="!bg-[#005B2F] hover:!bg-[#004626] text-white p-2 h-auto"
                                        >
                                            <Download size={18} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredDocs.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                                    Tidak ada dokumen ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PDF Viewer Modal */}
            <PDFViewerModal
                isOpen={isPDFModalOpen}
                onClose={() => setIsPDFModalOpen(false)}
                pdfUrl={selectedPDF}
                documentName={selectedTitle}
            />
        </>
    );
}
