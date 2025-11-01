import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  const linkClass = (path: string) =>
    `hover:underline ${router.pathname === path ? 'text-emerald-800 font-semibold' : 'text-emerald-900'}`

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
    </header>
  )
}
