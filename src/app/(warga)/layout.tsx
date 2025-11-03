import Header from '@/components/warga/Header'
import { ReactNode } from 'react'

export default function WargaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Header fixed di atas */}
      <Header />
      
      {/* Main Content dengan margin top untuk Header */}
      <main className="min-h-screen pt-16">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-700">SIMBADES</p>
                <p className="text-xs text-gray-600">Sistem Informasi Buku Desa</p>
              </div>
            </div>

            {/* Center: Links */}
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="/beranda" className="hover:text-green-600 transition-colors">Beranda</a>
              <a href="/lembaran-desa" className="hover:text-green-600 transition-colors">Lembaran Desa</a>
              <a href="/berita-desa" className="hover:text-green-600 transition-colors">Berita Desa</a>
            </div>

            {/* Right: Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} SIMBADES. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}