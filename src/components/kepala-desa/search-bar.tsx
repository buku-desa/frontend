"use client"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"

interface SearchBarProps {
    onSearch?: (query: string) => void
    value?: string
}

export function SearchBar({ onSearch, value = "" }: SearchBarProps) {
    return (
        <div className="flex gap-3 items-center">
            <Input
                type="text"
                placeholder="Cari judul, nomor, atau jenis dokumen"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
                onChange={(e) => onSearch?.(e.target.value)}
                value={value}
            />
            <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">Search</Button>
        </div>
    )
}
