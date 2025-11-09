"use client";

import { useState, useEffect } from "react";
import { Eye, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { getArchives, type Archive } from "@/lib/api";
import { downloadDocument } from "@/lib/api";

export default function ArsipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  // Modals
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState<Archive | null>(null);

  // Fetch archives when page changes
  useEffect(() => {
    fetchArchives();
  }, [currentPage]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchArchives = async () => {
    try {
      // Only show loading screen on initial page load
      if (isInitialLoad) {
        setLoading(true);
      }
      setError(null);

      const params: any = {};

      if (searchQuery) {
        params.search = searchQuery;
      }

      // Fetch ALL archives (no server pagination)
      const response = await getArchives(params);
      console.log("Archives full response:", response);
      console.log("Archives meta:", response.meta);
      console.log("Archives total:", response.meta?.total, typeof response.meta?.total);

      // Set all archives
      setArchives(response.data);
      setTotalPages(Math.ceil(response.data.length / perPage));

      // Mark initial load as complete
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
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
      setSelectedPDF(""); // Clear previous PDF

      // Fetch PDF as blob using authenticated request
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading && archives.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Client-side pagination
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedArchives = archives.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Arsip Card & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px]">
          <div className="bg-green-100 rounded-lg p-3 shrink-0">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4h18v4H3V4zm0 6h18v10H3V10zm4 2v6h10v-6H7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Arsip</h3>
            <p className="text-sm text-gray-600">Total : {archives.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-5 py-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari judul, nomor, atau jenis dokumen"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchArchives()}
          />
          <button
            onClick={fetchArchives}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-1.5 rounded-full font-medium text-sm transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Tabel Arsip */}
      <div className="overflow-x-auto overflow-y-auto max-h-fit bg-white border border-gray-200 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR ARSIP</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TANGGAL ARSIP</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TENTANG</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">KETERANGAN</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {displayedArchives.length === 0 ? (
              <tr>
                <td colSpan={6} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                  Tidak ada arsip
                </td>
              </tr>
            ) : (
              displayedArchives.map((archive, index) => (
                <tr key={archive.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    {archive.nomor_arsip || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    {formatDate(archive.tanggal_arsip)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    {archive.document?.tentang || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    {archive.keterangan || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <div className="flex gap-2 items-center justify-center">
                      <Button
                        size="sm"
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 h-auto"
                        onClick={() => handleView(archive)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                        onClick={() => handleDownload(archive)}
                      >
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
            Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, archives.length)} of{" "}
            {archives.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-1 border border-gray-300 rounded-lg bg-green-50">
              {currentPage} / {totalPages}
            </span>
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
              <button
                onClick={() => setIsPDFModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
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
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDownload}
                className="px-8 py-2 bg-[#2D5F2E] hover:bg-[#234a23] text-white rounded-full font-medium transition-colors"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
