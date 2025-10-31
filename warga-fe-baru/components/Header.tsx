import Link from 'next/link'

export default function Header() {
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
        <nav className="hidden md:flex gap-6 items-center text-sm text-emerald-900">
          <Link href="#">Beranda</Link>
          <Link href="/buku-lembaran-desa">Buku Lembaran Desa</Link>
          <Link href="/berita-desa">Berita Desa</Link>
        </nav>
      </div>
    </header>
  )
}
