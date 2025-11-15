"use client";

import { Button } from "@/components/shared/ui/button";
import { Eye, Download, Edit3, Archive, Loader2 } from "lucide-react";
import { FileText } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  getDocuments,
  downloadDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  type Document as APIDocument,
  type CreateDocumentData,
} from "@/lib/api";
import { getActivityLogs, type ActivityLog } from "@/lib/api";
import { createArchive, getArchives } from "@/lib/api";
import SearchBarSekdes from "@/components/sekdes/SearchBarSekdes";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<APIDocument[]>([]);
  const [verificationDocuments, setVerificationDocuments] = useState<APIDocument[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // All data for stats
  const [allDocuments, setAllDocuments] = useState<APIDocument[]>([]);
  const [allArchives, setAllArchives] = useState<any[]>([]);
  const [allActivities, setAllActivities] = useState<ActivityLog[]>([]);

  // Modal states
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<APIDocument | null>(null);

  // Form states for add/edit
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

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Only show loading screen on initial page load
      if (isInitialLoad) {
        setLoading(true);
      }
      setError(null);

      console.log("Fetching data from API...");

      // Fetch all documents for total count (all statuses)
      const allDocsResponse = await getDocuments({});
      setAllDocuments(allDocsResponse.data);

      // Fetch all documents (approved) for display - will be filtered by useMemo
      const approvedDocs = allDocsResponse.data.filter((d: APIDocument) => d.status === "Disetujui");
      setDocuments(approvedDocs);

      // Fetch documents pending verification (Draft status)
      const verifyResponse = await getDocuments({ status: "Draft" });
      console.log("Verification docs response:", verifyResponse);
      setVerificationDocuments(verifyResponse.data);

      // Fetch recent activity logs
      const logsResponse = await getActivityLogs({});
      console.log("Activity logs response:", logsResponse);
      setActivities(logsResponse.data.activity_logs);

      // Fetch all archives for total count
      const archivesResponse = await getArchives({});
      console.log("Archives response:", archivesResponse);
      console.log("Archives total type:", typeof archivesResponse.meta.total, archivesResponse.meta.total);
      setAllArchives(archivesResponse.data);

      // Fetch all activities for total count
      const allLogsResponse = await getActivityLogs({});
      setAllActivities(allLogsResponse.data.activity_logs);
      console.log("✅ Data fetching complete");

      // Mark initial load as complete
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response,
        status: err.response?.status,
      });

      let errorMessage = "Gagal memuat data dari server";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "Tidak dapat terhubung ke server. Pastikan backend Laravel sudah berjalan di http://localhost:8000";
      } else if (err.response?.status === 401) {
        errorMessage = "Sesi login Anda telah berakhir. Silakan login kembali.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering dengan useMemo (live search)
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) {
      return documents.slice(0, 3); // Show only first 3
    }

    const query = searchQuery.toLowerCase();
    return documents.filter((doc) => {
      return (
        doc.tentang?.toLowerCase().includes(query) ||
        doc.nomor_ditetapkan?.toLowerCase().includes(query) ||
        doc.jenis_dokumen?.toLowerCase().includes(query)
      );
    }).slice(0, 3);
  }, [searchQuery, documents]);

  const filteredVerificationDocuments = useMemo(() => {
    if (!searchQuery.trim()) {
      return verificationDocuments.slice(0, 4); // Show only first 4
    }

    const query = searchQuery.toLowerCase();
    return verificationDocuments.filter((doc) => {
      return (
        doc.tentang?.toLowerCase().includes(query) ||
        doc.nomor_ditetapkan?.toLowerCase().includes(query) ||
        doc.jenis_dokumen?.toLowerCase().includes(query)
      );
    }).slice(0, 4);
  }, [searchQuery, verificationDocuments]);

  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) {
      return activities.slice(0, 3); // Show only first 3
    }

    const query = searchQuery.toLowerCase();
    return activities.filter((act) => {
      return (
        act.aktivitas?.toLowerCase().includes(query) ||
        act.user?.name?.toLowerCase().includes(query) ||
        act.keterangan?.toLowerCase().includes(query)
      );
    }).slice(0, 3);
  }, [searchQuery, activities]);

  // Handler functions
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

  const handleArchive = (doc: APIDocument) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const confirmArchive = async () => {
    if (!selectedDoc) return;

    try {
      await createArchive({ id_dokumen: selectedDoc.id });
      alert("Dokumen berhasil diarsipkan!");
      fetchData(); // Refresh data
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengarsipkan dokumen");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddDocument = () => {
    setFormData({
      jenis_dokumen: "peraturan_desa",
      nomor_ditetapkan: "",
      tanggal_ditetapkan: "",
      tentang: "",
      keterangan: "",
      file_upload: undefined,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file_upload) {
      alert("File PDF harus diupload");
      return;
    }

    try {
      await createDocument(formData as CreateDocumentData);
      alert("Dokumen berhasil ditambahkan!");
      setIsAddModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambahkan dokumen");
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;

    try {
      await updateDocument(selectedDoc.id, formData);
      alert("Dokumen berhasil diupdate!");
      setIsEditModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengupdate dokumen");
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
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => fetchData()}>Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Three Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Dokumen Card */}
        <Link
          href="/sekdes/dokumen"
          className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px] cursor-pointer"
        >
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <FileText className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Dokumen</h3>
            <p className="text-sm text-gray-600">Total : {allDocuments.length}</p>
          </div>
        </Link>

        {/* Arsip Card */}
        <Link
          href="/sekdes/arsip"
          className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px] cursor-pointer"
        >
          <div className="bg-green-100 rounded-lg p-3 shrink-0">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4h18v4H3V4zm0 6h18v10H3V10zm4 2v6h10v-6H7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Arsip</h3>
            <p className="text-sm text-gray-600">Total : {allArchives.length}</p>
          </div>
        </Link>

        {/* Aktivitas Card */}
        <Link
          href="/sekdes/aktivitas"
          className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px] cursor-pointer"
        >
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aktivitas</h3>
            <p className="text-sm text-gray-600">Total : {allActivities.length}</p>
          </div>
        </Link>
      </div>

      {/* Add Document Button and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-8">
        <button
          onClick={handleAddDocument}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium text-sm whitespace-nowrap transition-colors"
        >
          <span className="text-xl font-bold">+</span> Tambah Dokumen
        </button>
        <div className="flex-1">
          <SearchBarSekdes value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Documents Table - Recent Approved Documents */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dokumen Terbaru</h2>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-12">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">NO</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">JENIS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  NOMOR & TANGGAL<br />DITETAPKAN
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">TENTANG</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{getJenisLabel(doc.jenis_dokumen)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {doc.nomor_ditetapkan || "-"}<br />
                    {formatDate(doc.tanggal_ditetapkan)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.tentang}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === "Disetujui"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "Draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : doc.status === "Ditolak"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
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
                        <>
                          <Button
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 h-auto"
                            onClick={() => handleEdit(doc)}
                          >
                            <Edit3 size={16} />
                          </Button>
                        </>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Verifikasi Dokumen</h2>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">NO</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">JENIS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    NOMOR & TANGGAL<br />DITETAPKAN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">TENTANG</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {filteredVerificationDocuments.length === 0 ? (
            // Jika tidak ada data, tampilkan baris ini
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                Tidak ada dokumen yang menunggu untuk diverifikasi.
              </td>
            </tr>
          ) : (
            // Jika ada data, tampilkan hasil map
            filteredVerificationDocuments.map((doc, index) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{getJenisLabel(doc.jenis_dokumen)}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {doc.nomor_ditetapkan || "-"}<br />
                  {formatDate(doc.tanggal_ditetapkan)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{doc.tentang}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Menunggu Verifikasi
                  </span>
                </td>
              </tr>
            ))
          )}

          {/* --- AKHIR PERUBAHAN --- */}
          
        </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Aktivitas Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Aktivitas Terbaru</h2>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">NO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">WAKTU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">USER</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">AKTIVITAS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.map((activity, index) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(activity.waktu_aktivitas).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.user?.name || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.aktivitas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {isPDFModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">{selectedTitle}</h3>
              <button
                onClick={() => setIsPDFModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe src={selectedPDF} className="w-full h-full" title="PDF Viewer" />
            </div>
          </div>
        </div>
      )}

      {/* Delete/Archive Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Apakah Anda yakin ingin mengarsipkan dokumen ini?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmArchive}
                className="px-8 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors"
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

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">TAMBAH DOKUMEN BARU</h3>
            <form className="space-y-4" onSubmit={handleSubmitAdd}>
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
                  required
                >
                  <option value="peraturan_desa">Peraturan Desa</option>
                  <option value="peraturan_kepala_desa">Peraturan Kepala Desa</option>
                  <option value="peraturan_bersama_kepala_desa">Peraturan Bersama Kepala Desa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Pilih Dokumen (PDF)</label>
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
                  required
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
                  placeholder="Contoh: 01/PD/2025"
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
                  required
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
                  placeholder="Contoh: Peraturan Desa tentang..."
                  required
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
                  placeholder="Keterangan tambahan (opsional)"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
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
                <label className="block text-sm text-gray-600 mb-2">Pilih Dokumen Baru (PDF) - Opsional</label>
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
                  placeholder="01/PD/2025"
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
                  placeholder="Peraturan Desa tentang..."
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
                  placeholder="Keterangan tambahan"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors"
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
