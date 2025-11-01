"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/shared/ui/button"

export function JenisCard() {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const handleCheckbox = (value: string) => {
        setSelectedOptions(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    const handleDownload = () => {
        if (selectedOptions.length === 0) {
            alert("Pilih minimal satu jenis peraturan terlebih dahulu.")
            return
        }
        alert(`Mengunduh dokumen: ${selectedOptions.join(", ")}`)
        setShowPopup(false)
    }

    return (
        <>
            {/* 🔹 Kartu Jenis Peraturan */}
            <div
                onClick={() => setShowPopup(true)}
                className="border-2 border-gray-400 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white w-fit"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-black p-2 rounded-lg flex-shrink-0">
                        <FileText className="text-white" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Jenis Peraturan Desa</h3>
                        <p className="text-gray-700 mt-1 text-sm">
                            Pilih kategori peraturan desa
                        </p>
                    </div>
                </div>
            </div>

            {/* 🔹 POP-UP */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 shadow-xl w-[420px] relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Pilih Jenis Peraturan
                        </h2>

                        {/* 🔹 Checkbox pilihan */}
                        <div className="flex flex-col gap-3 text-gray-700">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes("Peraturan Desa")}
                                    onChange={() => handleCheckbox("Peraturan Desa")}
                                    className="w-4 h-4 text-green-700"
                                />
                                <span>Peraturan Desa</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes("Peraturan Kepala Desa")}
                                    onChange={() => handleCheckbox("Peraturan Kepala Desa")}
                                    className="w-4 h-4 text-green-700"
                                />
                                <span>Peraturan Kepala Desa</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes("Peraturan Bersama Kepala Desa")}
                                    onChange={() => handleCheckbox("Peraturan Bersama Kepala Desa")}
                                    className="w-4 h-4 text-green-700"
                                />
                                <span>Peraturan Bersama Kepala Desa</span>
                            </label>
                        </div>

                        {/* 🔹 Tombol di bawah kanan */}
                        <div className="flex justify-end mt-6 gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowPopup(false)}
                                className="rounded-full border-gray-300"
                            >
                                Tutup
                            </Button>
                            <Button
                                className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6"
                                onClick={handleDownload}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
