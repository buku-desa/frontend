import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Warga Desa - Yogyakarta',
  description: 'Portal informasi desa untuk warga',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
