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
  pdfUrl?: string;
}

export default function DokumenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const documents: Document[] = [
    {
      no: 1,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "17 Agustus 2024",
      nomor: "01",
      pdfUrl: "/sample.pdf", // Ganti dengan URL PDF yang sebenarnya
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

  const handleViewDocument = (doc: Document) => {
    if (doc.pdfUrl) {
      setSelectedPDF(doc.pdfUrl);
      setSelectedTitle(`${doc.jenis} - ${doc.tentang}`);
      setIsPDFModalOpen(true);
    }
  };

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-6">
      {/* Dokumen Card and Search Bar */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 w-full max-w-md">
          <div className="flex items-center gap-6">
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
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-gray-200 rounded-full px-6 py-3 w-full max-w-xl">
            <input
              type="text"
              placeholder="Cari judul, nomor, atau jenis dokumen"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-medium">
              Search
            </button>
          </div>
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
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                      title="View Document"
                    >
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
                    <button className="bg-green-700 hover:bg-green-800 text-white p-2 rounded">
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
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
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

      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        pdfUrl={selectedPDF}
        title={selectedTitle}
      />
    </div>
  );
}
