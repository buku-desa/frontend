"use client";

import { Button } from "@/components/shared/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getActivityLogs, type ActivityLog } from "@/lib/api";
import SearchBarSekdes from "@/components/sekdes/SearchBarSekdes";

export default function AktivitasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Fetch activities on mount only
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      // Only show loading screen on initial page load
      if (isInitialLoad) {
        setLoading(true);
      }
      setError(null);

      // Fetch ALL activities (no filters, client-side filtering)
      const response = await getActivityLogs({});
      console.log("🔍 DEBUG: Full API Response:", response);
      console.log("🔍 DEBUG: Activity Logs:", response.data.activity_logs);
      // Log each activity string
      response.data.activity_logs.forEach((log: any, i: number) => {
        console.log(`🔍 [${i}] aktivitas: "${log.aktivitas}"`);
      });
      setActivities(response.data.activity_logs);

      // Mark initial load as complete
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (err: any) {
      console.error("Error fetching activities:", err);
      setError(err.response?.data?.message || "Gagal memuat activity logs");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionBadge = (action: string) => {
    // Try to extract action from aktivitas string
    if (action.includes("created") || action.includes("upload") || action.includes("Upload") || action.includes("ditambahkan") || action.includes("dibuat")) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Buat</span>;
    } else if (action.includes("updated") || action.includes("edit") || action.includes("Edit") || action.includes("diupdate") || action.includes("diperbarui")) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Edit</span>;
    } else if (action.includes("approved") || action.includes("setuju") || action.includes("Setuju") || action.includes("Disetujui")) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Disetujui</span>
      );
    } else if (action.includes("archived") || action.includes("arsip") || action.includes("Arsip") || action.includes("diarsipkan")) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Arsip</span>;
    } else if (action.includes("rejected") || action.includes("hapus") || action.includes("Hapus") || action.includes("Delete") || action.includes("ditolak")) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Ditolak</span>;
    } else {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Lainnya</span>;
    }
  };

  // Client-side filtering with useMemo (live search)
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) {
      return activities;
    }

    const query = searchQuery.toLowerCase();
    return activities.filter((activity) => {
      return (
        activity.aktivitas?.toLowerCase().includes(query) ||
        activity.user?.name?.toLowerCase().includes(query) ||
        activity.keterangan?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activities]);

  // Update total pages when filtered activities change
  const totalPages = Math.ceil(filteredActivities.length / perPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading && activities.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Client-side pagination
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedActivities = filteredActivities.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Aktivitas Card & Search Bar - Side by Side */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
        {/* Aktivitas Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow w-full lg:w-auto lg:min-w-[320px]">
          <div className="bg-green-50 rounded-lg p-3 shrink-0">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aktivitas</h3>
            <p className="text-sm text-gray-600">Total : {filteredActivities.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1">
          <SearchBarSekdes value={searchQuery} onChange={setSearchQuery} onSearch={() => fetchActivities()} placeholder="Cari aktivitas atau user" />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Activities Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">NO</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">WAKTU</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">AKSI</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">USER</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                DETAIL PERUBAHAN
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedActivities.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Tidak ada activity logs
                </td>
              </tr>
            ) : (
              displayedActivities.map((activity, index) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDateTime(activity.waktu_aktivitas)}</td>
                  <td className="px-6 py-4 text-sm">{getActionBadge(activity.aktivitas)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {activity.user?.name || "-"}
                    <br />
                    <span className="text-xs text-gray-500">{activity.user?.role}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{activity.keterangan || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filteredActivities.length)} of{" "}
            {filteredActivities.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-1 border border-gray-300 rounded-lg bg-green-50">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
