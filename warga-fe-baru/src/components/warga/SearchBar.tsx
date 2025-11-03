interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, onSearch, placeholder = "Cari judul, nomor, atau jenis dokumen" }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="max-w-4xl -mt-10 mb-14 px-2 mx-auto">
      <div className="bg-white rounded-full shadow-lg p-4 flex items-center gap-4">
        {/* Left search button */}
        <button 
          onClick={onSearch}
          className="bg-green-700 text-white rounded-full px-6 py-3 font-medium shadow-md hover:bg-green-800 transition-colors"
        >
          Search
        </button>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-6 py-3 rounded-full outline-none text-gray-700 placeholder-gray-400"
          placeholder={placeholder}
        />

        {/* Right filter icon */}
        <button className="p-3 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
