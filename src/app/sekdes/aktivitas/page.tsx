"use client";

import { useState } from "react";

interface Activity {
  no: number;
  waktu: string;
  aksi: string;
  user: string;
  detailPerubahan: string;
}

export default function AktivitasPage() {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="space-y-8">
      {/* Aktivitas Card */}
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aktivitas</h3>
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

      {/* Activities Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-[#2D5F2E] text-white">
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
            {/* Empty rows */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-300" colSpan={5}>4</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-300" colSpan={5}>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
