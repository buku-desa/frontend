"use client";

import { useState } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/shared/ui/button";

interface ArchivedDocument {
  no: number;
  jenis: string;
  nomorTanggalDitetapkan: string;
  tentang: string;
  tanggal: string;
  nomor: string;
}

export default function ArsipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<ArchivedDocument | null>(null);

  const handleDelete = (doc: ArchivedDocument) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    alert("Dokumen berhasil dihapus permanen!");
    setIsDeleteModalOpen(false);
  };

  const handleRestore = (doc: ArchivedDocument) => {
    setSelectedDoc(doc);
    setIsRestoreModalOpen(true);
  };

  const confirmRestore = () => {
    alert("Dokumen berhasil dipulihkan!");
    setIsRestoreModalOpen(false);
  };

  const documents: ArchivedDocument[] = [
    {
      no: 1,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan Desa",
      tanggal: "17 Agustus 2024",
      nomor: "01",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "01 Maret 2025",
      tentang: "Kebijakan Desa",
      tanggal: "01 Maret 2025",
      nomor: "02",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "30 Juli 2025",
      tentang: "Pengelolaan Aset Desa",
      tanggal: "30 Juli 2025",
      nomor: "03",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Arsip Card & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px]">
          <div className="bg-black rounded-lg p-3 flex-shrink-0">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="5" rx="1" />
              <rect x="3" y="10" width="18" height="11" rx="1" />
              <line x1="8" y1="14" x2="16" y2="14" />
              <line x1="8" y1="17" x2="16" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Arsip</h3>
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

      {/* Tabel Arsip */}
      <div className="overflow-x-auto overflow-y-auto max-h-fit bg-white border border-gray-200 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#005B2F] text-white">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">JENIS</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR & TANGGAL DITETAPKAN</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TENTANG</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">TANGGAL</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NOMOR</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.no} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.no}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.jenis}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.nomorTanggalDitetapkan}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.tentang}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.tanggal}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900">{doc.nomor}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex gap-2 items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto"
                      onClick={() => handleDelete(doc)}
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button
                      size="sm"
                      className="!bg-[#005B2F] hover:!bg-[#004626] text-white p-2 h-auto"
                      onClick={() => handleRestore(doc)}
                    >
                      <RotateCcw size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Apakah Anda yakin ingin menghapus dokumen ini secara permanen?
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
                className="px-8 py-2 bg-[#2D5F2E] hover:bg-[#234a23] text-white rounded-full font-medium transition-colors"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pulihkan */}
      {isRestoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Apakah Anda yakin ingin memulihkan dokumen ini?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsRestoreModalOpen(false)}
                className="px-8 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmRestore}
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
