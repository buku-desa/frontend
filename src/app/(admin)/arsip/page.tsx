"use client";

import { useState } from "react";
import PDFModal from "@/components/PDFModal";

interface ArchivedDocument {
  no: number;
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

  const documents: ArchivedDocument[] = [
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

  const handleViewDocument = (doc: ArchivedDocument) => {
    if (doc.pdfUrl) {
      setSelectedPDF(doc.pdfUrl);
      setSelectedTitle(`${doc.jenis} - ${doc.tentang}`);
      setIsPDFModalOpen(true);
    }
  };

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-6">
      {/* Arsip Card and Search Bar */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 w-full max-w-md">
          <div className="flex items-center gap-6">
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

      {/* Archived Documents Table */}
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
