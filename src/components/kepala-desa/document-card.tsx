"use client"

import { useState } from "react"
import { FileText, Calendar } from "lucide-react"
import { Button } from "@/components/shared/ui/button"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

type ReportPeriod = "week" | "month" | "year"

export function DocumentCard() {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod | null>(null)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [isDownloading, setIsDownloading] = useState(false)

    // Generate tahun options (5 tahun terakhir)
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

    // Hitung rentang tanggal berdasarkan periode
    const getDateRange = (period: ReportPeriod, year: number) => {
        const now = new Date()
        let start: string
        let end: string

        switch (period) {
            case "week":
                // Minggu ini (Senin - Minggu)
                const today = new Date()
                const dayOfWeek = today.getDay() // 0 = Minggu, 1 = Senin, ...
                const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
                const monday = new Date(today)
                monday.setDate(today.getDate() + mondayOffset)
                
                const sunday = new Date(monday)
                sunday.setDate(monday.getDate() + 6)
                
                start = monday.toISOString().split('T')[0]
                end = sunday.toISOString().split('T')[0]
                break

            case "month":
                // Bulan ini
                const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
                
                start = firstDay.toISOString().split('T')[0]
                end = lastDay.toISOString().split('T')[0]
                break

            case "year":
                // Tahun yang dipilih
                start = `${year}-01-01`
                end = `${year}-12-31`
                break

            default:
                start = `${year}-01-01`
                end = `${year}-12-31`
        }

        return { start, end }
    }

    const handleDownload = async () => {
        if (!selectedPeriod) {
            alert("Pilih jenis laporan terlebih dahulu.")
            return
        }

        setIsDownloading(true)

        try {
            const { start, end } = getDateRange(selectedPeriod, selectedYear)
            const token = localStorage.getItem("authToken")

            console.log("📥 Downloading report:", { 
                period: selectedPeriod, 
                year: selectedYear, 
                start, 
                end 
            })

            // Request ke backend untuk download PDF
            const response = await axios.get(`${API_BASE_URL}/laporan`, {
                params: {
                    by: selectedPeriod,
                    tahun: selectedYear,
                    start,
                    end,
                    format: 'pdf',
                    status: ['Disetujui', 'Arsip'], // Hanya dokumen yang sudah disetujui
                },
                responseType: 'blob', // PENTING untuk download file
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            })

            // Buat blob URL dan trigger download
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            
            // Nama file berdasarkan periode
            const periodLabel = {
                week: 'Mingguan',
                month: 'Bulanan',
                year: 'Tahunan'
            }[selectedPeriod]
            
            link.download = `Laporan-${periodLabel}-${start}-${end}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            setShowPopup(false)
            setSelectedPeriod(null)

        } catch (error) {
            console.error("❌ Download gagal:", error)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <>
            {/* Card Generate Laporan */}
            <div
                onClick={() => setShowPopup(true)}
                className="border-2 rounded-2xl p-4 cursor-pointer transition-shadow shadow-md hover:shadow-lg bg-white w-fit"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-green-50 p-2 rounded-lg shrink-0">
                        <FileText className="text-green-600" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Generate Laporan</h3>
                        <p className="text-gray-700 mt-1 text-sm">Mingguan / Bulanan / Tahunan</p>
                    </div>
                </div>
            </div>

            {/* Pop-up Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 shadow-xl w-[480px] relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                            disabled={isDownloading}
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Generate Laporan Dokumen
                        </h2>

                        {/* Pilih Periode */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pilih Periode Laporan
                            </label>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        checked={selectedPeriod === "week"}
                                        onChange={() => setSelectedPeriod("week")}
                                        className="w-4 h-4 text-green-700"
                                    />
                                    <div>
                                        <div className="font-medium">Laporan Mingguan</div>
                                        <div className="text-xs text-gray-500">Minggu ini (Senin - Minggu)</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        checked={selectedPeriod === "month"}
                                        onChange={() => setSelectedPeriod("month")}
                                        className="w-4 h-4 text-green-700"
                                    />
                                    <div>
                                        <div className="font-medium">Laporan Bulanan</div>
                                        <div className="text-xs text-gray-500">Bulan ini (1 - akhir bulan)</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        checked={selectedPeriod === "year"}
                                        onChange={() => setSelectedPeriod("year")}
                                        className="w-4 h-4 text-green-700"
                                    />
                                    <div>
                                        <div className="font-medium">Laporan Tahunan</div>
                                        <div className="text-xs text-gray-500">Satu tahun penuh (Jan - Des)</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Pilih Tahun (hanya muncul jika pilih tahunan) */}
                        {selectedPeriod === "year" && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pilih Tahun
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Info Preview */}
                        {selectedPeriod && (
                            <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="text-sm text-green-800">
                                    <Calendar className="inline w-4 h-4 mr-2" />
                                    <strong>Periode:</strong> {
                                        selectedPeriod === "week" ? "Minggu ini" :
                                        selectedPeriod === "month" ? "Bulan ini" :
                                        `Tahun ${selectedYear}`
                                    }
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                    Rentang: {getDateRange(selectedPeriod, selectedYear).start} s/d {getDateRange(selectedPeriod, selectedYear).end}
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowPopup(false)}
                                className="rounded-full border-gray-300"
                                disabled={isDownloading}
                            >
                                Batal
                            </Button>
                            <Button
                                className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6 disabled:opacity-50"
                                onClick={handleDownload}
                                disabled={!selectedPeriod || isDownloading}
                            >
                                {isDownloading ? (
                                    <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Downloading...
                                    </>
                                ) : (
                                    'Download PDF'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}