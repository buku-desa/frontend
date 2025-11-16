"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Home() {
  const beritaData = useMemo(() => [
    {
      id: 1,
      title: "Ujian Seleksi Pamong Kalurahan Caturtunggal Resmi Dibuka",
      date: "1 September 2025",
      tanggal_ditetapkan: "2025-09-01",
      file: "/Ujian Seleksi Pamong Kalurahan Caturtunggal Resmi Dibuka.pdf",
    },
    {
      id: 2,
      title:
        "Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal",
      date: "24 September 2025",
      tanggal_ditetapkan: "2025-09-24",
      file:
        "/Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal.pdf",
    },
    {
      id: 3,
      title: "Caturtunggal Hadirkan Dukcapil dan Pengadilan Negeri Sleman",
      date: "1 Oktober 2025",
      tanggal_ditetapkan: "2025-10-01",
      file: "/Caturtunggal Hadirkan Dukcapil dan Pengadilan Negeri Sleman.pdf",
    },
    {
      id: 4,
      title: "PERATURAN KALURAHAN CATURTUNGGAL  APBKAL23",
      date: "2023",
      tanggal_ditetapkan: "2023-01-01",
      file: "/PERATURAN KALURAHAN CATURTUNGGAL  APBKAL23.pdf",
    },
  ], []);

  const bukuData = useMemo(() => [
    {
      no: 1,
      judul: "PERATURAN KALURAHAN TENTANG RKP DESA Sendangsari 2021 NO.6",
      jenis: "Peraturan",
      tahun: "2021",
      tanggal_ditetapkan: "2021-01-01",
      file: "/PERATURAN KALURAHAN TENTANG RKP DESA Sendangsari 2021 NO.6.pdf",
    },
    {
      no: 2,
      judul: "PERKAL NO1 TAHUN 2022 LAPORAN PERTANGGUNGJAWABAN",
      jenis: "Peraturan",
      tahun: "2022",
      tanggal_ditetapkan: "2022-01-01",
      file: "/PERKAL NO1 TAHUN 2022 LAPORAN PERTANGGUNGJAWABAN.pdf",
    },
    {
      no: 3,
      judul: "PERATURAN KALURAHAN CATURTUNGGAL  APBKAL23",
      jenis: "Peraturan",
      tahun: "2022",
      tanggal_ditetapkan: "2022-06-01",
      file: "/PERATURAN KALURAHAN CATURTUNGGAL  APBKAL23.pdf",
    },
    {
      no: 4,
      judul: "Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal",
      jenis: "",
      tahun: "",
      tanggal_ditetapkan: "2025-09-24",
      file: "/Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal.pdf",
    },
    {
      no: 5,
      judul: "Sosialisasi Perda DIY Nomor 3 Tahun 2020",
      jenis: "",
      tahun: "",
      tanggal_ditetapkan: "2020-01-01",
      file: "/Sosialisasi Perda DIY Nomor 3 Tahun 2020_ DPRD DIY Tekankan Pembangunan Wilayah Perbatasan.pdf",
    },
  ], []);

  // Filters & sorting (public view: newest first)
  const [beritaQuery, setBeritaQuery] = useState("");
  const [bukuQuery, setBukuQuery] = useState("");

  const filteredSortedBerita = useMemo(() => {
    return [...beritaData]
      .filter((b) =>
        beritaQuery
          ? `${b.title} ${b.date}`.toLowerCase().includes(beritaQuery.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.tanggal_ditetapkan) - new Date(a.tanggal_ditetapkan));
  }, [beritaData, beritaQuery]);

  const filteredSortedBuku = useMemo(() => {
    return [...bukuData]
      .filter((d) =>
        bukuQuery
          ? `${d.judul} ${d.jenis} ${d.tahun}`.toLowerCase().includes(bukuQuery.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.tanggal_ditetapkan) - new Date(a.tanggal_ditetapkan));
  }, [bukuData, bukuQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header is provided by RootLayout */}

      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('/jogja.png')" }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center md:items-start justify-center text-center md:text-left">
          <h1 className="text-white text-6xl font-bold mb-8" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Yogyakarta
          </h1>
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg max-w-xl w-full">
            <button className="bg-green-700 text-white px-6 py-3 font-medium hover:bg-green-800">
              Search
            </button>
            <input
              type="text"
              placeholder="Cari judul, nomor, atau jenis dokumen"
              className="flex-1 px-4 py-3 outline-none text-black"
            />
            <button className="px-4 py-3 text-black hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Berita Desa Section */}
      <section className="container mx-auto max-w-7xl px-4 py-12" id="berita">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Berita Desa</h2>
          <input
            value={beritaQuery}
            onChange={(e) => setBeritaQuery(e.target.value)}
            placeholder="Cari berita..."
            className="h-9 w-56 rounded-md border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-6 snap-x snap-mandatory scroll-smooth pr-4" aria-label="Berita scroll container">
            {filteredSortedBerita.map((berita) => (
              <a
                key={berita.id}
                href={berita.file ? encodeURI(berita.file) : '#'}
                target={berita.file ? "_blank" : undefined}
                rel={berita.file ? "noopener noreferrer" : undefined}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow flex-none min-w-[360px] sm:min-w-[420px] snap-start block"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-green-700">
                  <Image
                    src="/document.png"
                    alt="document"
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-black text-xl leading-snug mb-3">
                    {berita.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {berita.date}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Buku Lembaran Desa Section */}
      <section className="container mx-auto max-w-7xl px-4 py-12" id="buku">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900">Buku Lembaran Desa</h2>
            <input
              value={bukuQuery}
              onChange={(e) => setBukuQuery(e.target.value)}
              placeholder="Cari dokumen..."
              className="h-9 w-64 rounded-md border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">NO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">JUDUL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">JENIS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">TAHUN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSortedBuku.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{item.no}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.file ? (
                      <a
                        href={encodeURI(item.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-900 hover:underline"
                      >
                        {item.judul}
                      </a>
                    ) : (
                      item.judul
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">{item.jenis}</td>
                  <td className="px-6 py-4 text-sm">{item.tahun}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-3">
                      {item.file ? (
                        <a
                          href={encodeURI(item.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700"
                          aria-label="Lihat dokumen"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                      ) : (
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white opacity-50 cursor-not-allowed" disabled aria-disabled="true">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      )}
                      {item.file ? (
                        <a
                          href={encodeURI(item.file)}
                          download
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 text-white hover:bg-green-800"
                          aria-label="Unduh dokumen"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      ) : (
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 text-white opacity-50 cursor-not-allowed" disabled aria-disabled="true">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}