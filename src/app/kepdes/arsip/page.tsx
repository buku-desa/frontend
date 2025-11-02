"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { PDFViewerModal } from "@/components/kepala-desa/pdf-viewer-modal";
import { SearchBar } from "@/components/kepala-desa/search-bar";
import { DownloadConfirmationDialog } from "@/components/kepala-desa/download-confirmation-dialog";

interface ArchivedDocument {
    id: number;
    jenis: string;
    nomorTanggalDitetapkan: string;
    tentang: string;
    tanggal: string;
    nomor: string;
    pdfUrl?: string;
}

export default function ArsipPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
    const [selectedPDF, setSelectedPDF] = useState<string>("");
    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const [downloadConfirm, setDownloadConfirm] = useState<{ isOpen: boolean; docId: number | null }>({
        isOpen: false,
        docId: null,
    });

    const documents: ArchivedDocument[] = [
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

    const handleDownloadClick = (docId: number) => {
        setDownloadConfirm({ isOpen: true, docId });
    };

    const handleDownloadConfirm = () => {
        const doc = documents.find((d) => d.id === downloadConfirm.docId);
        if (doc && doc.pdfUrl) {
            const link = document.createElement("a");
            link.href = doc.pdfUrl;
            link.download = `${doc.jenis}-${doc.nomor}.pdf`;
            link.click();
        }
        setDownloadConfirm({ isOpen: false, docId: null });
    };

    const filteredDocs = documents.filter((doc) =>
        [doc.jenis, doc.nomor, doc.tentang]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <main className="space-y-8">

            {/* Header Card & Search */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-12">
                <div className="bg-white border border-gray-300 shadow-md rounded-2xl p-4 flex items-center gap-3 ">

                    <div className="bg-[black] rounded-xl p-3 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M3 4h18v4H3V4zm0 6h18v10H3V10zm4 2v6h10v-6H7z" />
                        </svg>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Arsip</h3>
                        <p className="text-gray-700 mt-1 text-s">Total: {documents.length} dokumen</p>
                    </div>
                </div>

                <div className="w-full max-w-[500px]">
                    {/* Gunakan SearchBar komponen */}

                    <SearchBar
                        value={searchQuery}
                        onSearch={(q) => setSearchQuery(q)}
                    />
                </div>





                {/* Tabel Arsip */}
                <div className="bg-white rounded-2xl shadow-md overflow-x-auto mt-8">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#005B2F] text-white">
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">JENIS</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    NOMOR & TANGGAL DITETAPKAN
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TENTANG</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TANGGAL</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredDocs.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
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
                                                onClick={() => handleDownloadClick(doc.id)}
                                            >
                                                <Download size={18} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredDocs.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        Tidak ada dokumen ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PDF Viewer Modal */}
            <PDFViewerModal
                isOpen={isPDFModalOpen}
                onClose={() => setIsPDFModalOpen(false)}
                pdfUrl={selectedPDF}
                documentName={selectedTitle}
            />

            {/* Download Confirmation Dialog */}
            <DownloadConfirmationDialog
                isOpen={downloadConfirm.isOpen}
                onConfirm={handleDownloadConfirm}
                onCancel={() => setDownloadConfirm({ isOpen: false, docId: null })}
                documentName="dokumen"
            />
        </main>
    );
}
