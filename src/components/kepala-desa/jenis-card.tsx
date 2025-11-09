"use client"

import { useState } from "react"
import { FileText, Calendar } from "lucide-react"
import { Button } from "@/components/shared/ui/button"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

type JenisDokumen = 
    | "peraturan_desa" 
    | "peraturan_kepala_desa" 
    | "peraturan_bersama_kepala_desa"

const jenisOptions = [
    { value: "peraturan_desa", label: "Peraturan Desa" },
    { value: "peraturan_kepala_desa", label: "Peraturan Kepala Desa" },
    { value: "peraturan_bersama_kepala_desa", label: "Peraturan Bersama Kepala Desa" },
]

export function JenisCard() {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedJenis, setSelectedJenis] = useState<JenisDokumen[]>([])
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [isDownloading, setIsDownloading] = useState(false)

    // Generate tahun options (5 tahun terakhir)
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

    const handleCheckbox = (value: JenisDokumen) => {
        setSelectedJenis(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    const handleDownload = async () => {
        if (selectedJenis.length === 0) {
            alert("Pilih minimal satu jenis peraturan terlebih dahulu.")
            return
        }

        setIsDownloading(true)

        try {
            const token = localStorage.getItem("authToken")
            
            // Rentang tanggal untuk tahun yang dipilih
            const start = `${selectedYear}-01-01`
            const end = `${selectedYear}-12-31`

            console.log("📥 Downloading by jenis:", { 
                jenis: selectedJenis, 
                year: selectedYear,
                start,
                end
            })

            // Request ke backend dengan filter jenis_dokumen
            const response = await axios.get(`${API_BASE_URL}/laporan`, {
                params: {
                    by: 'year',
                    tahun: selectedYear,
                    start,
                    end,
                    jenis_dokumen: selectedJenis, // Filter berdasarkan jenis
                    format: 'pdf',
                    status: ['Disetujui', 'Arsip'],
                },
                responseType: 'blob',
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
                paramsSerializer: {
  serialize: params => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(`${key}[]`, v))
      } else {
        searchParams.append(key, String(value))
      }
    })
    return searchParams.toString()
  },
},
            })

            // Download file
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            
            // Nama file
            const jenisLabel = selectedJenis.map(j => {
                const option = jenisOptions.find(o => o.value === j)
                return option?.label || j
            }).join('-')
            
            link.download = `Laporan-${jenisLabel}-${selectedYear}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            setShowPopup(false)
            setSelectedJenis([])

        } catch (error) {
            console.error("❌ Download gagal:", error)
            alert("Gagal mengunduh laporan. Silakan coba lagi.")
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <>
            {/* Card Jenis Peraturan */}
            <div
                onClick={() => setShowPopup(true)}
                className="border-2 rounded-2xl p-4 cursor-pointer transition-shadow shadow-md hover:shadow-lg bg-white w-fit"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-green-50 p-2 rounded-lg shrink-0">
                        <FileText className="text-green-600" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Jenis Peraturan Desa</h3>
                        <p className="text-gray-700 mt-1 text-sm">
                            Pilih kategori peraturan desa
                        </p>
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
                            Download Laporan Berdasarkan Jenis
                        </h2>

                        {/* Info */}
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                                Pilih satu atau lebih jenis peraturan untuk mengunduh laporan
                            </p>
                        </div>

                        {/* Pilih Tahun */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tahun Laporan
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

                        {/* Checkbox Jenis */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Jenis Peraturan
                            </label>
                            <div className="flex flex-col gap-3">
                                {jenisOptions.map(({ value, label }) => (
                                    <label 
                                        key={value}
                                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedJenis.includes(value as JenisDokumen)}
                                            onChange={() => handleCheckbox(value as JenisDokumen)}
                                            className="w-4 h-4 text-green-700"
                                        />
                                        <span className="font-medium">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Preview Info */}
                        {selectedJenis.length > 0 && (
                            <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="text-sm text-green-800">
                                    <FileText className="inline w-4 h-4 mr-2" />
                                    <strong>Dipilih:</strong> {selectedJenis.length} jenis peraturan
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                    {jenisOptions
                                        .filter(opt => selectedJenis.includes(opt.value as JenisDokumen))
                                        .map(opt => opt.label)
                                        .join(', ')
                                    }
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                    <Calendar className="inline w-3 h-3 mr-1" />
                                    Periode: 1 Januari {selectedYear} - 31 Desember {selectedYear}
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
                                disabled={selectedJenis.length === 0 || isDownloading}
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