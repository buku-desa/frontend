"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/id"
dayjs.locale("id")

export interface Activity {
    no: number
    waktu: string
    aksi: string
    user: string
    detailPerubahan: string
}

export default function TabelAktivitas() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('authToken')



    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/activity-logs", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })

                if (!res.ok) throw new Error("Gagal mengambil data")


                const json = await res.json()
                const logs = json.data?.activity_logs || []

                const formatted = logs.map((item: any, index: number) => ({
                    no: index + 1,
                    waktu: dayjs(item.created_at).format("D MMMM YYYY, HH:mm:ss"),
                    aksi: item.aktivitas,
                    user: item.user?.name || "-",
                    detailPerubahan: item.keterangan || `Dokumen ID: ${item.document_id}`
                }))

                setActivities(formatted)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchActivities()
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-green-800 text-white">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NO</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">WAKTU</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">AKSI</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">USER</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">DETAIL AKTIVITAS</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.length > 0 ? (
                        activities.map((act) => (
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
    )
}
