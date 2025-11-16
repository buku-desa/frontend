'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            aria-label="Open menu"
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
            onClick={() => setOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Beranda</Link>
          <Link href="/buku" className="text-gray-700 hover:text-gray-900">Buku Lembaran Desa</Link>
          <Link href="/berita" className="text-gray-700 hover:text-gray-900">Berita Desa</Link>
        </nav>
        <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800">
          Log in Admin
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 z-40" />
          <aside
            ref={panelRef}
            className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto animate-[slideIn_.2s_ease-out]"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-semibold text-green-800">Menu</h2>
              <button
                aria-label="Close menu"
                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                onClick={() => setOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-lg">
              <Link href="/" className="flex items-center gap-3 text-gray-900 hover:text-green-700" onClick={() => setOpen(false)}>
                <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M4 10v10a2 2 0 002 2h12a2 2 0 002-2V10"/></svg>
                Beranda
              </Link>
              <Link href="/buku" className="flex items-center gap-3 text-gray-900 hover:text-green-700" onClick={() => setOpen(false)}>
                <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
                Buku Lembaran Desa
              </Link>
              <Link href="/berita" className="flex items-center gap-3 text-gray-900 hover:text-green-700" onClick={() => setOpen(false)}>
                <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h10M4 14h16M4 18h10"/></svg>
                Berita Desa
              </Link>
            </nav>
          </aside>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </header>
  );
}
