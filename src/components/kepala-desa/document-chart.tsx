"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { tahun: "2018", jumlah: 120 },
    { tahun: "2019", jumlah: 150 },
    { tahun: "2020", jumlah: 180 },
    { tahun: "2021", jumlah: 210 },
    { tahun: "2022", jumlah: 190 },
    { tahun: "2023", jumlah: 250 },
    { tahun: "2024", jumlah: 300 },
]

export function DocumentChart() {
    return (
        <div className="w-full h-80 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Jumlah Dokumen Administrasi Desa per Tahun
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="jumlah"
                        stroke="#2563eb" // warna garis biru
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
