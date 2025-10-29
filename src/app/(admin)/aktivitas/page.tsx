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
      waktu: "21-09-2025 14:32",
      aksi: "Verifikasi",
      user: "Kepala Desa",
      detailPerubahan: "Dokumen disetujui",
    },
    {
      no: 2,
      waktu: "21-09-2025 13:10",
      aksi: "Edit",
      user: "Sekretaris Desa",
      detailPerubahan: "Nomor : 04 → 07",
    },
    {
      no: 3,
      waktu: "21-09-2025 12:55",
      aksi: "Upload",
      user: "Sekretaris Desa",
      detailPerubahan: "Dokumen diunggah pertama kali",
    },
  ];

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-6">
      {/* Activity Card and Search Bar */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 w-full max-w-md">
          <div className="flex items-center gap-6">
            <div className="bg-black rounded-lg p-4">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                <path d="M16 2h-2v4h2V2zm-6 0H8v4h2V2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Aktivitas</h3>
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

      {/* Activities Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">NO</th>
              <th className="px-6 py-4 text-left font-semibold">WAKTU</th>
              <th className="px-6 py-4 text-left font-semibold">AKSI</th>
              <th className="px-6 py-4 text-left font-semibold">USER</th>
              <th className="px-6 py-4 text-left font-semibold">
                DETAIL PERUBAHAN
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.no} className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-800">{activity.no}</td>
                <td className="px-6 py-4 text-gray-800">{activity.waktu}</td>
                <td className="px-6 py-4 text-gray-800">{activity.aksi}</td>
                <td className="px-6 py-4 text-gray-800">{activity.user}</td>
                <td className="px-6 py-4 text-gray-800">
                  {activity.detailPerubahan}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="px-6 py-4 text-gray-400">
                4
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="px-6 py-4 text-gray-400">
                5
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
