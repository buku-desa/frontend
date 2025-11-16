"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { SearchBar } from "@/components/kepala-desa/search-bar";
import { Loader2 } from "lucide-react";

dayjs.locale("id");

export interface Activity {
  no: number;
  waktu: string;
  aksi: string;
  user: string;
  detailPerubahan: string;
}

export default function AktivitasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Ambil token — client only
  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    setToken(t);
  }, []);

  // Fetch API hanya setelah token ada
  useEffect(() => {
    if (!token) return;

    const fetchActivities = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/activity-logs", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const json = await res.json();
        const logs = json.data?.activity_logs || [];

        const formatted: Activity[] = logs.map((item: any, index: number) => ({
          no: index + 1,
          waktu: dayjs(item.created_at).format("D MMMM YYYY, HH:mm:ss"),
          aksi: item.aktivitas,
          user: item.user?.name || "-",
          detailPerubahan: item.keterangan || `Dokumen ID: ${item.document_id}`,
        }));

        setActivities(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [token]);

  const filteredActivities = activities.filter((act) =>
    [act.aksi, act.user, act.detailPerubahan]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <main className="space-y-8">
      {/* Header Card & Search */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-12">
        <div className="bg-white border-2 shadow-md rounded-2xl p-4 flex items-center gap-3">
          <div className="bg-green-50 rounded-xl p-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
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

        <div className="w-full max-w-[500px]">
          <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        </div>
      </div>

      {/* Tabel */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="px-4 py-3">NO</th>
                <th className="px-4 py-3">WAKTU</th>
                <th className="px-4 py-3">AKSI</th>
                <th className="px-4 py-3">USER</th>
                <th className="px-4 py-3">DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act) => (
                  <tr key={act.no} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{act.no}</td>
                    <td className="px-4 py-3">{act.waktu}</td>
                    <td className="px-4 py-3">{act.aksi}</td>
                    <td className="px-4 py-3">{act.user}</td>
                    <td className="px-4 py-3">{act.detailPerubahan}</td>
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
      )}
    </main>
  );
}
