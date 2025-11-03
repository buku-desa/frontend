"use client";

import { Button } from "@/components/shared/ui/button"
import { Eye, Download, Edit3, Archive } from "lucide-react"
import { FileText } from "lucide-react";

import { useState } from "react";
import Link from "next/link";

interface Document {
  no: number;
  jenis: string;
  nomorTanggalDitetapkan: string;
  tentang: string;
  tanggal: string;
  nomor: string;
  status?: string;
  pdfUrl?: string;
}

interface Activity {
  no: number;
  waktu: string;
  aksi: string;
  user: string;
  detailPerubahan: string;
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const activities: Activity[] = [
    {
      no: 1,
      waktu: "21-08-2025 14:32",
      aksi: "Verifikasi",
      user: "Kepala Desa",
      detailPerubahan: "Dokumen disetujui",
    },
    {
      no: 2,
      waktu: "21-08-2025 13:10",
      aksi: "Edit",
      user: "Sekretaris Desa",
      detailPerubahan: "Nomor : 04 → 07",
    },
    {
      no: 3,
      waktu: "21-08-2025 12:55",
      aksi: "Upload",
      user: "Sekretaris Desa",
      detailPerubahan: "Dokumen diurugan pertama kali",
    },
  ];


  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // <-- 1. STATE BARU DITAMBAHKAN
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // Handler functions
  const handleView = (doc: Document) => {
    if (doc.pdfUrl) {
      setSelectedPDF(doc.pdfUrl);
      setSelectedTitle(`${doc.jenis} - ${doc.tentang}`);
      setIsPDFModalOpen(true);
    } else {
      alert(`View dokumen: ${doc.jenis} - Nomor ${doc.nomor}`);
    }
  };

  const handleDownload = (doc: Document) => {
    setSelectedDoc(doc);
    setIsDownloadModalOpen(true);
  };

  const confirmDownload = () => {
    if (selectedDoc?.pdfUrl) {
      window.open(selectedDoc.pdfUrl, '_blank');
    }
    setIsDownloadModalOpen(false);
  };

  const handleEdit = (doc: Document) => {
    setSelectedDoc(doc);
    setIsEditModalOpen(true);
  };

  const handleArchive = (doc: Document) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Logic untuk hapus dokumen
    alert("Dokumen berhasil diarsipkan!");
    setIsDeleteModalOpen(false);
  };

  // Sample data
  const documents: Document[] = [
    {
      no: 1,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "17 Agustus 2024",
      nomor: "01",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "01 Maret 2025",
      nomor: "02",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "30 Juli 2025",
      nomor: "03",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const verificationDocuments: Document[] = [
    {
      no: 1,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "17 Agustus 2024",
      nomor: "01",
      status: "verifikasi\n17 Agustus 2024",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "01 Maret 2025",
      nomor: "02",
      status: "verifikasi\n01 Maret 2025",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "30 Juli 2025",
      nomor: "03",
      status: "verifikasi\n30 Juli 2025",
    },
    {
      no: 4,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "01 Mei 2025",
      tentang: "Peraturan",
      tanggal: "Loading",
      nomor: "07",
      status: "Menunggu Verifikasi",
    },
  ];

  const aktivitasDocuments: Document[] = [
    {
      no: 1,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "17 Agustus 2024",
      nomor: "01",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "01 Maret 2025",
      nomor: "02",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "30 Juli 2025",
      nomor: "03",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Three Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Dokumen Card */}
        <Link href="/sekdes/dokumen" className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <FileText className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Dokumen</h3>
            <p className="text-sm text-gray-600">Total : 104</p>
          </div>
        </Link>

        {/* Arsip Card */}
        <Link href="/sekdes/arsip" className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M3 4h18v4H3V4zm0 6h18v10H3V10zm4 2v6h10v-6H7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Arsip</h3>
            <p className="text-sm text-gray-600">Total : 104</p>
          </div>
        </Link>

        {/* Aktivitas Card */}
        <Link href="/sekdes/aktivitas" className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
                        >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              <path d="M16 2h-2v4h2V2zm-6 0H8v4h2V2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aktivitas</h3>
            <p className="text-sm text-gray-600">Total : 104</p>
          </div>
        </Link>
      </div>

      {/* Scan Dokumen Button and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-8">
        {/* 2. TOMBOL DIHUBUNGKAN */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium text-sm whitespace-nowrap transition-colors"
        >
          <span className="text-xl font-bold">+</span> Tambah Dokumen
        </button>
        <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-5 py-2">
          <input
            type="text"
            placeholder="Cari judul, nomor, atau jenis dokumen"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-1.5 rounded-full font-medium text-sm transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-12">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  NO
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  JENIS
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  NOMOR & TANGGAL<br />DITETAPKAN
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  TENTANG
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  TANGGAL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  NOMOR
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.no}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.jenis}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {doc.nomorTanggalDitetapkan}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.tentang}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.tanggal}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{doc.nomor}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {/* View Button */}
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
                      <Button
                        size="sm"
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 h-auto"
                        onClick={() => handleEdit(doc)}
                      >
                        <Edit3 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white p-2 h-auto"
                        onClick={() => handleArchive(doc)}
                      >
                        <Archive size={16} />
                      </Button>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Verifikasi Dokumen
        </h2>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    NO
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    JENIS
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    NOMOR & TANGGAL<br />DITETAPKAN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    TENTANG
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    TANGGAL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    NOMOR
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {verificationDocuments.map((doc) => (
                  <tr key={doc.no} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.no}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.jenis}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {doc.nomorTanggalDitetapkan}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.tentang}</td>
                    <td className={`px-4 py-3 text-sm ${doc.tanggal === "Loading" ? "text-blue-600" : "text-gray-900"
                      }`}>
                      {doc.tanggal}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.nomor}</td>
                    <td className={`px-4 py-3 text-sm whitespace-pre-line ${doc.status === "Menunggu Verifikasi" ? "text-blue-600" : "text-gray-900"
                      }`}>
                      {doc.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Aktivitas Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Aktivitas</h2>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    NO
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    WAKTU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    AKSI
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    USER
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    DETAIL PERUBAHAN
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.no} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.no}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.waktu}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.aksi}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.detailPerubahan}</td>
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={selectedPDF}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete/Archive Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Apakah Anda yakin ingin menghapus dokumen ini?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
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

      {/* Edit/Upload Modal */}
      {isEditModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">EDIT DOKUMEN</h3> 
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Pilih Dokumen</label>
                <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Pilih Dokumen</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">PDF</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">JENIS</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.jenis}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="Peraturan"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR & TANGGAL DITETAPKAN</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.nomorTanggalDitetapkan}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="01 Mei 2025"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">TENTANG</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.tentang}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="Peraturan"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.nomor}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="07"
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
                  type="button"
                  onClick={() => {
                    alert("Dokumen berhasil diupdate!");
                    setIsEditModalOpen(false);
                  }}
                  className="px-8 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL TAMBAH BARU DITAMBAHKAN */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            {/* Judul diubah */}
            <h3 className="text-lg font-semibold text-gray-900 mb-6">TAMBAH DOKUMEN BARU</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Pilih Dokumen</label>
                <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Pilih Dokumen</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">PDF</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">JENIS</label>
                <input
                  type="text"
                  // defaultValue dihapus
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="Contoh: Peraturan"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR & TANGGAL DITETAPKAN</label>
                <input
                  type="text"
                  // defaultValue dihapus
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="Contoh: 01 Mei 2025"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">TENTANG</label>
                <input
                  type="text"
                  // defaultValue dihapus
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="Contoh: Peraturan Desa tentang..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR</label>
                <input
                  type="text"
                  // defaultValue dihapus
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                  placeholder="Contoh: 07"
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)} // Menggunakan setIsAddModalOpen
                  className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Dokumen berhasil ditambahkan!"); // Logika diubah
                    setIsAddModalOpen(false);
                  }}
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

