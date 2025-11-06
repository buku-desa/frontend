import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const linkClass = (path: string) =>
    `hover:underline ${router.pathname === path ? 'text-emerald-800 font-semibold' : 'text-emerald-900'}`

  return (
    <header className="bg-emerald-50 border-b border-emerald-100 relative z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Buka menu"
            onClick={() => setOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-emerald-900">Caturtunggal</span>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <Link href="/" className={linkClass('/') } aria-current={router.pathname === '/' ? 'page' : undefined}>
            Beranda
          </Link>
          <Link
            href="/buku-lembaran-desa"
            className={linkClass('/buku-lembaran-desa')}
            aria-current={router.pathname === '/buku-lembaran-desa' ? 'page' : undefined}
          >
            Buku Lembaran Desa
          </Link>
          <Link href="/berita-desa" className={linkClass('/berita-desa')} aria-current={router.pathname === '/berita-desa' ? 'page' : undefined}>
            Berita Desa
          </Link>
        </nav>
      </div>

      {/* Mobile side drawer */}
      {open && (
        <>
          {/* backdrop */}
          <button
            aria-label="Tutup menu"
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-lg font-semibold text-emerald-900">Menu</span>
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-3 py-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-50">
                    <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                    <span>Beranda</span>
                  </Link>
                </li>
                <li>
                  <Link href="/buku-lembaran-desa" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-50">
                    <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                    <span>Buku Lembaran Desa</span>
                  </Link>
                </li>
                <li>
                  <Link href="/berita-desa" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-50">
                    <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 4H5m14-8H5m14 12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14z" />
                    </svg>
                    <span>Berita Desa</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
