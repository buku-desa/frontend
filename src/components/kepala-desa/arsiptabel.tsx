"use client";

import { useState, useEffect } from "react";
import { Eye, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { getDocumentDownloadUrl } from "@/lib/api/shared/documents";
import { getArchives, type Archive, downloadDocument } from "@/lib/api";

export default function TabelArsip() {
    const [archives, setArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalArchives, setTotalArchives] = useState(0);
    const perPage = 10;

    // Modals
    const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
    const [selectedPDF, setSelectedPDF] = useState<string>("");
    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [selectedArchive, setSelectedArchive] = useState<Archive | null>(null);

    useEffect(() => {
        fetchArchives();
    }, [currentPage]);

    const fetchArchives = async () => {
        try {
            setLoading(true);
            setError(null);

            const params: any = { per_page: perPage, page: currentPage };
            const response = await getArchives(params);

            setArchives(response.data);
            setTotalArchives(response.meta.total);
            setTotalPages(Math.ceil(response.meta.total / perPage));
        } catch (err: any) {
            console.error("Error fetching archives:", err);
            setError(err.response?.data?.message || "Gagal memuat arsip");
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (archive: Archive) => {
        if (!archive.document) return;

        try {
            setSelectedTitle(`${getJenisLabel(archive.document.jenis_dokumen)} - ${archive.document.tentang}`);
            setIsPDFModalOpen(true);
            setSelectedPDF("");

            const blob = await downloadDocument(archive.document.id);
            const pdfUrl = window.URL.createObjectURL(blob);
            setSelectedPDF(pdfUrl);
        } catch (err: any) {
            console.error("Error loading PDF:", err);
            alert(err.response?.data?.message || "Gagal memuat PDF");
            setIsPDFModalOpen(false);
        }
    };

    const handleDownload = (archive: Archive) => {
        setSelectedArchive(archive);
        setIsDownloadModalOpen(true);
    };

    const confirmDownload = async () => {
        if (!selectedArchive?.document) return;

        try {
            const blob = await downloadDocument(selectedArchive.document.id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${selectedArchive.document.tentang}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            alert(err.response?.data?.message || "Gagal mendownload dokumen");
        } finally {
            setIsDownloadModalOpen(false);
        }
    };

    const getJenisLabel = (jenis: string) => {
        switch (jenis) {
            case "peraturan_desa":
                return "Peraturan Desa";
            case "peraturan_kepala_desa":
                return "Peraturan Kepala Desa";
            case "peraturan_bersama_kepala_desa":
                return "Peraturan Bersama Kepala Desa";
            default:
                return jenis;
        }
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

    if (loading && archives.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>
            )}

            {/* Table */}
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                <table className="w-full border-collapse table-fixed">
                    <thead>
                        <tr className="bg-green-800 text-white">
                            <th className="border border-gray-300 px-6 py-3 text-left font-semibold">NO</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-semibold">NOMOR ARSIP</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-semibold">TANGGAL ARSIP</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-semibold">TENTANG</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-semibold">KETERANGAN</th>
                            <th className="border border-gray-300 px-6 py-3 text-center font-semibold">AKSI</th>
                        </tr>
                    </thead>

                    <tbody>
                        {archives.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="border border-gray-300 px-6 py-8 text-center text-gray-500">
                                    Tidak ada arsip
                                </td>
                            </tr>
                        ) : (
                            archives.map((archive, index) => (
                                <tr key={archive.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="border border-gray-300 px-6 py-3 text-gray-900">
                                        {(currentPage - 1) * perPage + index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-6 py-3 text-gray-900">
                                        {archive.nomor_arsip || "-"}
                                    </td>
                                    <td className="border border-gray-300 px-6 py-3 text-gray-900">
                                        {archive.tanggal_arsip ? formatDate(archive.tanggal_arsip) : "-"}
                                    </td>
                                    <td className="border border-gray-300 px-6 py-3 text-gray-900">
                                        {archive.document?.tentang || "-"}
                                    </td>
                                    <td className="border border-gray-300 px-6 py-3 text-gray-900">
                                        {archive.keterangan || "-"}
                                    </td>
                                    <td className="border border-gray-300 px-6 py-3 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <Button size="sm" className="bg-green-100 hover:bg-green-200 text-green-700 p-2 h-auto" onClick={() => handleView(archive)}>
                                                <Eye size={16} />
                                            </Button>
                                            <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                                                onClick={() => handleDownload(archive)}>
                                                <Download size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
                    <div className="text-sm text-gray-700">
                        Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, totalArchives)} of {totalArchives} results
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="px-4 py-1 border border-gray-300 rounded-lg bg-green-50">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* PDF Modal */}
            {isPDFModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">{selectedTitle}</h3>
                            <button onClick={() => setIsPDFModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <iframe src={selectedPDF} className="w-full h-full" title="PDF Viewer" />
                        </div>
                    </div>
                </div>
            )}

            {/* Download Modal */}
            {isDownloadModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
                            Apakah kamu yakin ingin mendownload dokumen ini?
                        </h3>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setIsDownloadModalOpen(false)} className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors">Batal</button>
                            <button onClick={confirmDownload} className="px-8 py-2 bg-[#2D5F2E] hover:bg-[#234a23] text-white rounded-full font-medium transition-colors">Ya</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
