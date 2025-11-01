"use client";

import { useState } from "react";
import { SearchBar } from "@/components/kepala-desa/search-bar";
import { Button } from "@/components/shared/ui/button";

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

    const filteredActivities = activities.filter((act) =>
        [act.aksi, act.user, act.detailPerubahan]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (

        <main className="min-h-screen bg-gray-50 py-12 px-8">
            {/* Header Card & Search */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-12">
                {/* Card Aktivitas */}
                <div className="bg-white border border-gray-300 shadow-md rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-[black] rounded-xl p-3 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            <path d="M16 2h-2v4h2V2zm-6 0H8v4h2V2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Aktivitas</h3>
                        <p className="text-gray-700 mt-1">Total: {activities.length} aktivitas</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-[500px]">
                    <SearchBar
                        value={searchQuery}
                        onSearch={(q) => setSearchQuery(q)}
                    />
                </div>
            </div>

            {/* Tabel Aktivitas */}
            <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#005B2F] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">WAKTU</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">USER</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">DETAIL PERUBAHAN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredActivities.length > 0 ? (
                            filteredActivities.map((act) => (
                                <tr key={act.no} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="border border-gray-300 px-4 py-3">{act.no}</td>
                                    <td className="border border-gray-300 px-4 py-3">{act.waktu}</td>
                                    <td className="border border-gray-300 px-4 py-3">{act.aksi}</td>
                                    <td className="border border-gray-300 px-4 py-3">{act.user}</td>
                                    <td className="border border-gray-300 px-4 py-3">{act.detailPerubahan}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                                    Tidak ada aktivitas ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
