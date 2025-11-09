"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import { getDocuments } from "@/lib/api"

interface ChartData {
    tahun: string
    jumlah: number
}

export function DocumentChart() {
    const [chartData, setChartData] = useState<ChartData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchDocuments()
    }, [])

    const fetchDocuments = async () => {
        try {
            setLoading(true)
            setError(null)

            // Ambil semua dokumen
            const response = await getDocuments({ per_page: 1000 })
            console.log("📦 Response backend:", response)

            const docs = response.data || []
            console.log("📄 Total dokumen:", docs.length)
            console.log("📄 Sample dokumen:", docs[0])

            // Cek field apa yang tersedia
            if (docs.length > 0) {
                console.log("🔍 Fields tersedia:", Object.keys(docs[0]))
            }

            // Hitung semua dokumen per tahun berdasarkan tanggal_diundangkan
            const countPerYear: Record<string, number> = {}

            docs.forEach((doc: any) => {
                // Coba beberapa field tanggal yang mungkin ada
                const tanggal = doc.tanggal_diundangkan || doc.tanggal_ditetapkan || doc.created_at

                if (tanggal) {
                    const year = new Date(tanggal).getFullYear().toString()
                    countPerYear[year] = (countPerYear[year] || 0) + 1
                    console.log(`✅ Dokumen ditemukan: tahun ${year}`)
                }
            })

            console.log("📊 Count per tahun:", countPerYear)

            // Convert ke array dan sort
            const formatted: ChartData[] = Object.entries(countPerYear)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([tahun, jumlah]) => ({
                    tahun,
                    jumlah: jumlah as number,
                }))

            console.log("📊 Data untuk chart:", formatted)
            setChartData(formatted)

        } catch (err: any) {
            console.error("❌ Error:", err)
            setError(err.response?.data?.message || "Gagal memuat data grafik")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="w-full h-80 bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-80 bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        )
    }

    if (chartData.length === 0) {
        return (
            <div className="w-full h-80 bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Tidak ada data dokumen ditemukan</p>
            </div>
        )
    }

    return (
        <div className="w-full h-80 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Jumlah Dokumen Administrasi Desa per Tahun
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="jumlah"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}