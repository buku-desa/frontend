# Buku Desa - Frontend (Portal Admin)

Frontend untuk Portal Admin Sistem Informasi Buku Desa menggunakan Next.js, TypeScript, dan Tailwind CSS.

## Fitur Portal Admin

Portal untuk admin desa dengan fitur:
- Dashboard administrasi dengan statistik
- Manajemen data warga
- Kelola pengumuman
- Laporan dan aktivitas terbaru

## Struktur Folder

```
frontend/
├── src/
│   ├── app/
│   │   ├── (warga)/          # Route group untuk warga
│   │   ├── (admin)/           # Route group untuk admin
│   │   ├── (kepala-desa)/     # Route group untuk kepala desa
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── warga/            # Components khusus warga
│   │   ├── admin/            # Components khusus admin
│   │   ├── kepala-desa/      # Components khusus kepala desa
│   │   └── shared/           # Shared components
│   └── lib/                  # Utilities & helpers
├── public/                   # Static assets
└── package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Routing

- `/` - Landing page dengan links ke semua portal
- `/warga` - Portal Warga
- `/admin` - Portal Admin
- `/kepala-desa` - Portal Kepala Desa

## Tech Stack

- **Next.js 16** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - UI library

## Development Notes

- Menggunakan Next.js App Router dengan Route Groups
- Setiap portal memiliki layout terpisah
- Components diorganisir berdasarkan role untuk maintainability
- Shared components untuk code reuse

## Next Steps

1. Implementasi authentication & authorization
2. Connect ke backend API
3. State management (jika diperlukan)
4. Form validation
5. Loading & error states
6. Responsive design improvements
