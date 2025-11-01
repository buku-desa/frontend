"use client";

import { useState } from "react";

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
      tentang: "Peraturan",
      tanggal: "17 Agustus 2024",
      nomor: "01",
    },
    {
      no: 2,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "01 Maret 2025",
      nomor: "02",
    },
    {
      no: 3,
      jenis: "Peraturan",
      nomorTanggalDitetapkan: "17 Agustus 2024",
      tentang: "Peraturan",
      tanggal: "30 Juli 2025",
      nomor: "03",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 lg:p-12">
      {/* Arsip Card */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full max-w-md">
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
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-8">
        <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-5 py-2">
          <input
            type="text"
            placeholder="Cari judul, nomor, atau jenis dokumen"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-[#2D5F2E] hover:bg-[#234a23] text-white px-5 py-1.5 rounded-full font-medium text-sm transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Archived Documents Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#2D5F2E] text-white">
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
                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(doc)}
                        className="bg-[#DC2626] hover:bg-[#B91C1C] text-white p-1.5 rounded transition-colors"
                        title="Delete Permanent"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {/* Restore Button */}
                      <button 
                        onClick={() => handleRestore(doc)}
                        className="bg-[#2D5F2E] hover:bg-[#234a23] text-white p-1.5 rounded transition-colors"
                        title="Restore"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Empty rows */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-300" colSpan={7}>4</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-300" colSpan={7}>5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
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

      {/* Restore Modal */}
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
