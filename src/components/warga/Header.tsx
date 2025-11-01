'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `hover:underline ${pathname === path ? 'text-emerald-800 font-semibold' : 'text-emerald-900'}`

  return (
    <header className="bg-emerald-50 border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="text-2xl font-bold text-emerald-800">Yogyakarta</Link>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <Link href="/warga" className={linkClass('/warga')} aria-current={pathname === '/warga' ? 'page' : undefined}>
            Beranda
          </Link>
          <Link
            href="/lembaran-desa"
            className={linkClass('/lembaran-desa')}
            aria-current={pathname === '/lembaran-desa' ? 'page' : undefined}
          >
            Buku Lembaran Desa
          </Link>
          <Link href="/berita-desa" className={linkClass('/berita-desa')} aria-current={pathname === '/berita-desa' ? 'page' : undefined}>
            Berita Desa
          </Link>
        </nav>
      </div>
    </header>
  )
}
