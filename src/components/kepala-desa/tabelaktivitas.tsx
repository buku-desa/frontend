// components/tabel-aktivitas.tsx
"use client";

import { useState } from "react";

export interface Activity {
    no: number;
    waktu: string;
    aksi: string;           // Dari backend: "aktivitas"
    user: string;
    detailPerubahan: string; // Dari backend: "keterangan"
}

interface TabelAktivitasProps {
    activities?: Activity[];
}

export default function TabelAktivitas({ activities }: TabelAktivitasProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const defaultActivities: Activity[] = activities || [
        { no: 1, waktu: "21-09-2025 14:32", aksi: "Verifikasi", user: "Kepala Desa", detailPerubahan: "Dokumen disetujui" },
        { no: 2, waktu: "21-09-2025 13:10", aksi: "Edit", user: "Sekretaris Desa", detailPerubahan: "Nomor : 04 → 07" },
        { no: 3, waktu: "21-09-2025 12:55", aksi: "Upload", user: "Sekretaris Desa", detailPerubahan: "Dokumen diunggah pertama kali" },
    ];

    const filteredActivities = defaultActivities.filter(act =>
        [act.aksi, act.user, act.detailPerubahan].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-green-800 text-white">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">WAKTU</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">USER</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">DETAIL PERUBAHAN</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map(act => (
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
    );
}
