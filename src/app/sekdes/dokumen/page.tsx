"use client";

import { Button } from "@/components/shared/ui/button"
import { Eye, Download, Edit3, Archive } from "lucide-react"
import { useState } from "react";

interface Document {
  no: number;
  jenis: string;
  nomorTanggalDitetapkan: string;
  tentang: string;
  tanggal: string;
  nomor: string;
  pdfUrl?: string;
}

export default function DokumenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
    alert("Dokumen berhasil diarsipkan!");
    setIsDeleteModalOpen(false);
  };

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
        {/* Dokumen Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px]">
          <div className="bg-black rounded-lg p-3 flex-shrink-0">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 2v6h6M10 9h4M10 13h4M10 17h4" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Dokumen</h3>
            <p className="text-sm text-gray-600">Total : 104</p>
          </div>
        </div>

        {/* Search Bar */}
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

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-[#005B2F] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">NO</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">JENIS</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">NOMOR/TANGGAL DITETAPKAN</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">TENTANG</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">TANGGAL</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">NOMOR</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">AKSI</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.no} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{doc.no}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{doc.jenis}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{doc.nomorTanggalDitetapkan}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{doc.tentang}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{doc.tanggal}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{doc.nomor}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-zinc-600 hover:bg-zinc-500 text-white p-2 h-auto"
                      onClick={() => handleView(doc)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      className="!bg-[#005B2F] hover:!bg-[#004626] text-white p-2 h-auto"
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

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Apakah Anda yakin ingin menghapus dokumen ini?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
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
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">UPLOAD DOKUMEN</h3>
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
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR & TANGGAL DITETAPKAN</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.nomorTanggalDitetapkan}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">TENTANG</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.tentang}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">NOMOR</label>
                <input
                  type="text"
                  defaultValue={selectedDoc.nomor}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F2E]"
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
                  type="button"
                  onClick={() => {
                    alert("Dokumen berhasil diupdate!");
                    setIsEditModalOpen(false);
                  }}
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
