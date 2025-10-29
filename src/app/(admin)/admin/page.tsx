"use client";

import { useState } from "react";
import PDFModal from "@/components/PDFModal";

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

export default function AdminPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  // Sample data
  const documents: Document[] = [
    {
      no: 1,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "17 Agustus 2024",
      nomor: "01",
      pdfUrl: "/sample.pdf",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "01 Maret 2025",
      nomor: "02",
      pdfUrl: "/sample.pdf",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "30 Juli 2025",
      nomor: "03",
      pdfUrl: "/sample.pdf",
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
      status: "Verifikasi\n17 Agustus 2024",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "01 Maret 2025",
      nomor: "02",
      status: "Verifikasi\n01 Maret 2025",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "30 Juli 2025",
      nomor: "03",
      status: "Verifikasi\n30 Juli 2025",
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

  const handleAddDocument = () => {
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleEditDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setIsEditModalOpen(true);
  };

  const handleDeleteDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    // Here you would actually delete the document
  };

  const handleSaveEdit = () => {
    setIsEditModalOpen(false);
    // Here you would actually save the edited document
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    if (doc.pdfUrl) {
      setSelectedPDF(doc.pdfUrl);
      setSelectedTitle(`${doc.jenis} - ${doc.tentang}`);
      setIsViewModalOpen(true);
    }
  };

  const handleDownloadDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setIsDownloadModalOpen(true);
  };

  const handleConfirmDownload = () => {
    setIsDownloadModalOpen(false);
    // Here you would actually download the document
    // window.open('/path/to/document.pdf', '_blank');
  };

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-6">
      {/* Three Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dokumen Card */}
        <a href="/dokumen" className="bg-white rounded-2xl border-2 border-gray-300 p-8 flex items-center gap-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="bg-black rounded-lg p-4">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 2v6h6M10 13h4M10 17h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Dokumen</h3>
            <p className="text-gray-600">Total : 104</p>
          </div>
        </a>

        {/* Arsip Card */}
        <a href="/arsip" className="bg-white rounded-2xl border-2 border-gray-300 p-8 flex items-center gap-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="bg-black rounded-lg p-4">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 4h18v4H3V4zm0 6h18v10H3V10zm4 2v6h10v-6H7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Arsip</h3>
            <p className="text-gray-600">Total : 104</p>
          </div>
        </a>

        {/* Aktivitas Card */}
        <a href="/aktivitas" className="bg-white rounded-2xl border-2 border-gray-300 p-8 flex items-center gap-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="bg-black rounded-lg p-4">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Aktivitas</h3>
            <p className="text-gray-600">Total : 104</p>
          </div>
        </a>
      </div>

      {/* Scan Dokumen Button and Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
        >
          <span className="text-2xl">+</span> Scan Dokumen
        </button>
        <div className="flex-1 flex items-center gap-2 bg-gray-200 rounded-full px-6 py-3">
          <input
            type="text"
            placeholder="Cari judul, nomor, atau jenis dokumen"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">NO</th>
              <th className="px-6 py-4 text-left font-semibold">JENIS</th>
              <th className="px-6 py-4 text-left font-semibold">
                NOMOR & TANGGAL DITETAPKAN
              </th>
              <th className="px-6 py-4 text-left font-semibold">TENTANG</th>
              <th className="px-6 py-4 text-left font-semibold">TANGGAL</th>
              <th className="px-6 py-4 text-left font-semibold">NOMOR</th>
              <th className="px-6 py-4 text-left font-semibold">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.no} className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-800">{doc.no}</td>
                <td className="px-6 py-4 text-gray-800">{doc.jenis}</td>
                <td className="px-6 py-4 text-gray-800">
                  {doc.nomorTanggalDitetapkan}
                </td>
                <td className="px-6 py-4 text-gray-800">{doc.tentang}</td>
                <td className="px-6 py-4 text-gray-800">{doc.tanggal}</td>
                <td className="px-6 py-4 text-gray-800">{doc.nomor}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleViewDocument(doc)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button onClick={() => handleDownloadDocument(doc)} className="bg-green-700 hover:bg-green-800 text-white p-2 rounded">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded" onClick={() => handleEditDocument(doc)}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded" onClick={() => handleDeleteDocument(doc)}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={7} className="px-6 py-4 text-gray-400">
                4
              </td>
            </tr>
            <tr>
              <td colSpan={7} className="px-6 py-4 text-gray-400">
                5
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Verification Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Verifikasi Dokumen
        </h2>
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">NO</th>
                <th className="px-6 py-4 text-left font-semibold">JENIS</th>
                <th className="px-6 py-4 text-left font-semibold">
                  NOMOR & TANGGAL DITETAPKAN
                </th>
                <th className="px-6 py-4 text-left font-semibold">TENTANG</th>
                <th className="px-6 py-4 text-left font-semibold">TANGGAL</th>
                <th className="px-6 py-4 text-left font-semibold">NOMOR</th>
                <th className="px-6 py-4 text-left font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {verificationDocuments.map((doc) => (
                <tr key={doc.no} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-800">{doc.no}</td>
                  <td className="px-6 py-4 text-gray-800">{doc.jenis}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {doc.nomorTanggalDitetapkan}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{doc.tentang}</td>
                  <td
                    className={`px-6 py-4 ${
                      doc.tanggal === "Loading"
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {doc.tanggal}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{doc.nomor}</td>
                  <td
                    className={`px-6 py-4 whitespace-pre-line ${
                      doc.status === "Menunggu Verifikasi"
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {doc.status}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={7} className="px-6 py-4 text-gray-400">
                  5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-6">
              UPLOAD DOKUMEN
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Dokumen
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Pilih Dokumen"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg">
                    Choose File
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JENIS
                </label>
                <input
                  type="text"
                  placeholder="Isi Jenis"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NOMOR & TANGGAL DITETAPKAN
                </label>
                <input
                  type="text"
                  placeholder="Isi Nomor & Tanggal Ditetapkan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TENTANG
                </label>
                <input
                  type="text"
                  placeholder="Isi Tentang Apa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NOMOR
                </label>
                <input
                  type="text"
                  placeholder="Isi Nomor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-2 rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleAddDocument}
                className="bg-green-700 hover:bg-green-800 text-white px-12 py-2 rounded-full font-medium"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-12 w-full max-w-lg text-center">
            <p className="text-xl font-semibold text-gray-800 mb-8">
              Dokumen berhasil diunggah, menunggu verifikasi.
            </p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-green-700 hover:bg-green-800 text-white px-16 py-2 rounded-full font-medium"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
      {isEditModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-6">
              UPLOAD DOKUMEN
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Dokumen
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-500">Pilih Dokumen</span>
                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      </svg>
                      PDF
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JENIS
                </label>
                <input
                  type="text"
                  defaultValue={selectedDocument.jenis}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NOMOR & TANGGAL DITETAPKAN
                </label>
                <input
                  type="text"
                  defaultValue={selectedDocument.nomorTanggalDitetapkan}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TENTANG
                </label>
                <input
                  type="text"
                  defaultValue={selectedDocument.tentang}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NOMOR
                </label>
                <input
                  type="text"
                  defaultValue={selectedDocument.nomor}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-2 rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-green-700 hover:bg-green-800 text-white px-12 py-2 rounded-full font-medium"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-12 w-full max-w-lg text-center">
            <p className="text-xl font-semibold text-gray-800 mb-8">
              Apakah Anda yakin ingin menghapus dokumen ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-2 rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-green-700 hover:bg-green-800 text-white px-12 py-2 rounded-full font-medium"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Confirmation Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-12 w-full max-w-lg text-center">
            <p className="text-xl font-semibold text-gray-800 mb-8">
              Apakah kamu yakin ingin mendownload dokumen ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-2 rounded-full font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDownload}
                className="bg-green-700 hover:bg-green-800 text-white px-12 py-2 rounded-full font-medium"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal for View Document */}
      <PDFModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        pdfUrl={selectedPDF}
        title={selectedTitle}
      />
    </div>
  );
}
