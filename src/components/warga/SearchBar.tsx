'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-2 border border-gray-200">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 py-3 outline-none text-gray-700 placeholder:text-gray-400" 
            placeholder="Cari judul, nomor, atau jenis dokumen" 
          />
        </div>
        <button 
          onClick={handleSearch}
          className="px-8 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition-colors flex items-center gap-2"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  )
}