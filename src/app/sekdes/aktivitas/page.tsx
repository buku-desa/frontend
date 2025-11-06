"use client";

import { Button } from "@/components/shared/ui/button"
import { Eye, Download, Edit3, Archive } from "lucide-react"

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
      {/* Aktivitas Card & Search Bar - Side by Side */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
        {/* Aktivitas Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px]">
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

      {/* Activities Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
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
  );
}
