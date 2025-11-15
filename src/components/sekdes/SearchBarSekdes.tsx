"use client";

import React from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBarSekdes({ value, onChange, onSearch, placeholder = "Cari judul, nomor, atau jenis dokumen", className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-5 py-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch?.();
            }
          }}
        />
      </div>

      <button
        onClick={() => onSearch?.()}
        className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-medium text-sm transition-colors"
      >
        Search
      </button>
    </div>
  );
}
