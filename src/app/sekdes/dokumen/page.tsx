"use client";

import { Button } from "@/components/shared/ui/button";
import { Eye, Download, Edit3, Archive, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getDocuments,
  downloadDocument,
  updateDocument,
  type Document as APIDocument,
} from "@/lib/api";
import { createArchive } from "@/lib/api";

export default function DokumenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<APIDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  // Filter
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [jenisFilter, setJenisFilter] = useState<string>("all");

  // Modal states
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<APIDocument | null>(null);

  // Form data for edit
  const [formData, setFormData] = useState<{
    jenis_dokumen: 'peraturan_desa' | 'peraturan_kepala_desa' | 'peraturan_bersama_kepala_desa';
    nomor_ditetapkan: string;
    tanggal_ditetapkan: string;
    tentang: string;
    keterangan: string;
    file_upload: File | undefined;
  }>({
    jenis_dokumen: "peraturan_desa",
    nomor_ditetapkan: "",
    tanggal_ditetapkan: "",
    tentang: "",
    keterangan: "",
    file_upload: undefined,
  });

  // Fetch documents when page or filters change
  useEffect(() => {
    fetchDocuments();
  }, [currentPage, statusFilter, jenisFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchDocuments = async () => {
    try {
      // Only show loading screen on initial page load
      if (isInitialLoad) {
        setLoading(true);
      }
      setError(null);

      const params: any = {};

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      if (jenisFilter !== "all") {
        params.jenis_dokumen = jenisFilter;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      // Fetch ALL documents (no server pagination)
      const response = await getDocuments(params);
      console.log("Documents full response:", response);
      console.log("Documents meta:", response.meta);
      console.log("Documents total:", response.meta?.total, typeof response.meta?.total);

      // Set all documents
      setDocuments(response.data);
      setTotalPages(Math.ceil(response.data.length / perPage));

      // Mark initial load as complete
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (err: any) {
      console.error("Error fetching documents:", err);
      setError(err.response?.data?.message || "Gagal memuat dokumen");
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleView = async (doc: APIDocument) => {
    try {
      setSelectedTitle(`${getJenisLabel(doc.jenis_dokumen)} - ${doc.tentang}`);
      setIsPDFModalOpen(true);
      setSelectedPDF(""); // Clear previous PDF

      // Fetch PDF as blob using authenticated request
      const blob = await downloadDocument(doc.id);
      const pdfUrl = window.URL.createObjectURL(blob);
      setSelectedPDF(pdfUrl);
    } catch (err: any) {
      console.error("Error loading PDF:", err);
      alert(err.response?.data?.message || "Gagal memuat PDF");
      setIsPDFModalOpen(false);
    }
  };

  const handleDownload = (doc: APIDocument) => {
    setSelectedDoc(doc);
    setIsDownloadModalOpen(true);
  };

  const confirmDownload = async () => {
    if (!selectedDoc) return;

    try {
      const blob = await downloadDocument(selectedDoc.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedDoc.tentang}.pdf`;
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

  const handleEdit = (doc: APIDocument) => {
    setSelectedDoc(doc);
    setFormData({
      jenis_dokumen: doc.jenis_dokumen,
      nomor_ditetapkan: doc.nomor_ditetapkan || "",
      tanggal_ditetapkan: doc.tanggal_ditetapkan || "",
      tentang: doc.tentang,
      keterangan: doc.keterangan || "",
      file_upload: undefined,
    });
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;

    try {
      await updateDocument(selectedDoc.id, formData);
      alert("Dokumen berhasil diupdate!");
      setIsEditModalOpen(false);
      fetchDocuments();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengupdate dokumen");
    }
  };

  const handleArchive = (doc: APIDocument) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const confirmArchive = async () => {
    if (!selectedDoc) return;

    try {
      await createArchive({ id_dokumen: selectedDoc.id });
      alert("Dokumen berhasil diarsipkan!");
      setIsDeleteModalOpen(false);
      fetchDocuments();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengarsipkan dokumen");
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

  const getStatusBadge = (status: string) => {
    const styles = {
      Draft: "bg-yellow-100 text-yellow-800",
      Disetujui: "bg-green-100 text-green-800",
      Ditolak: "bg-red-100 text-red-800",
      Arsip: "bg-gray-100 text-gray-800",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  if (loading && documents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Client-side pagination
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedDocuments = documents.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
        {/* Dokumen Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px]">
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <FileText className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Dokumen</h3>
            <p className="text-sm text-gray-600">Total : {documents.length}</p>
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
            onKeyPress={(e) => e.key === "Enter" && fetchDocuments()}
          />
          <button
            onClick={fetchDocuments}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-1.5 rounded-full font-medium text-sm transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Semua Status</option>
            <option value="Draft">Draft</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Dokumen:</label>
          <select
            value={jenisFilter}
            onChange={(e) => {
              setJenisFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Semua Jenis</option>
            <option value="peraturan_desa">Peraturan Desa</option>
            <option value="peraturan_kepala_desa">Peraturan Kepala Desa</option>
            <option value="peraturan_bersama_kepala_desa">Peraturan Bersama Kepala Desa</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-[#005B2F] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">NO</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">JENIS</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                NOMOR/TANGGAL DITETAPKAN
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">TENTANG</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">STATUS</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">AKSI</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {displayedDocuments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Tidak ada dokumen
                </td>
              </tr>
            ) : (
              displayedDocuments.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{getJenisLabel(doc.jenis_dokumen)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {doc.nomor_ditetapkan || "-"}
                    <br />
                    {formatDate(doc.tanggal_ditetapkan)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.tentang}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-center">
                      <Button
                        size="sm"
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 h-auto"
                        onClick={() => handleView(doc)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-800 text-white p-2 h-auto"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download size={16} />
                      </Button>
                      {(doc.status === "Draft" || doc.status === "Ditolak") && (
                        <Button
                          size="sm"
                          className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 h-auto"
                          onClick={() => handleEdit(doc)}
                        >
                          <Edit3 size={16} />
                        </Button>
                      )}
                      {doc.status === "Disetujui" && (
                        <Button
                          size="sm"
                          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white p-2 h-auto"
                          onClick={() => handleArchive(doc)}
                        >
                          <Archive size={16} />
                        </Button>
                      )}
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
            Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, documents.length)} of{" "}
            {documents.length} results
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
              <button onClick={() => setIsPDFModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe src={selectedPDF} className="w-full h-full" title="PDF Viewer" />
            </div>
          </div>
        </div>
      )}

      {/* Archive Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Apakah Anda yakin ingin mengarsipkan dokumen ini?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={confirmArchive}
                className="px-8 py-2 bg-[#2D5F2E] hover:bg-[#234a23] text-white rounded-full font-medium"
              >
                Ya
              </button>
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
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={confirmDownload}
                className="px-8 py-2 bg-[#2D5F2E] hover:bg-[#234a23] text-white rounded-full font-medium"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">EDIT DOKUMEN</h3>
            <form className="space-y-4" onSubmit={handleSubmitEdit}>
              <div>
                <label className="block text-sm text-gray-600 mb-2">JENIS DOKUMEN</label>
                <select
                  value={formData.jenis_dokumen}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jenis_dokumen: e.target.value as any,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                >
                  <option value="peraturan_desa">Peraturan Desa</option>
                  <option value="peraturan_kepala_desa">Peraturan Kepala Desa</option>
                  <option value="peraturan_bersama_kepala_desa">Peraturan Bersama Kepala Desa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Upload PDF Baru (Opsional)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      file_upload: e.target.files?.[0] || undefined,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR DITETAPKAN</label>
                <input
                  type="text"
                  value={formData.nomor_ditetapkan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nomor_ditetapkan: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">TANGGAL DITETAPKAN</label>
                <input
                  type="date"
                  value={formData.tanggal_ditetapkan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tanggal_ditetapkan: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">TENTANG</label>
                <input
                  type="text"
                  value={formData.tentang}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tentang: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">KETERANGAN</label>
                <textarea
                  value={formData.keterangan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      keterangan: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 bg-[#2D5F2E] hover:bg-[#234a23] text-white rounded-full font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
