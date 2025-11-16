"use client";
import { useMemo, useState } from "react";

export default function BeritaPage() {
  const beritaData = useMemo(
    () => [
      {
        id: 1,
        title: "Ujian Seleksi Pamong Kalurahan Caturtunggal Resmi Dibuka",
        date: "1 September 2025",
        tanggal_ditetapkan: "2025-09-01",
        excerpt:
          "Kalurahan Caturtunggal membuka pendaftaran ujian seleksi calon pamong kalurahan untuk mengisi posisi yang dibutuhkan dalam pelayanan kepada masyarakat.",
        file: "/Ujian Seleksi Pamong Kalurahan Caturtunggal Resmi Dibuka.pdf",
      },
      {
        id: 2,
        title:
          "Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal",
        date: "24 September 2025",
        tanggal_ditetapkan: "2025-09-24",
        excerpt:
          "Kalurahan Caturtunggal memberikan bantuan bibit ikan dan perlengkapan budidaya kepada kelompok pembudidaya ikan Minadadi untuk meningkatkan produksi dan kesejahteraan masyarakat.",
        file:
          "/Pembudidaya Ikan Minadadi Terima Bantuan Bibit dan Perlengkapan dari Kalurahan Caturtunggal.pdf",
      },
      {
        id: 3,
        title: "Caturtunggal Hadirkan Dukcapil dan Pengadilan Negeri Sleman",
        date: "1 Oktober 2025",
        tanggal_ditetapkan: "2025-10-01",
        excerpt:
          "Layanan administrasi kependudukan dan sidang isbat digelar di Kalurahan Caturtunggal untuk memudahkan pelayanan masyarakat secara terpadu.",
        file: "/Caturtunggal Hadirkan Dukcapil dan Pengadilan Negeri Sleman.pdf",
      },
      {
        id: 4,
        title:
          "Sosialisasi Perda DIY Nomor 3 Tahun 2020: Pembangunan Wilayah Perbatasan",
        date: "2023",
        tanggal_ditetapkan: "2023-01-01",
        excerpt:
          "Kegiatan sosialisasi menekankan pentingnya sinergi pembangunan di wilayah perbatasan guna pemerataan layanan dan kesejahteraan.",
        file:
          "/Sosialisasi Perda DIY Nomor 3 Tahun 2020_ DPRD DIY Tekankan Pembangunan Wilayah Perbatasan.pdf",
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    return [...beritaData]
      .filter((b) =>
        query
          ? `${b.title} ${b.date} ${b.excerpt ?? ""}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : true
      )
      .sort(
        (a, b) =>
          new Date(b.tanggal_ditetapkan) - new Date(a.tanggal_ditetapkan)
      );
  }, [beritaData, query]);

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12" id="berita">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Berita Desa</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari berita..."
          className="h-9 w-64 rounded-md border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <div className="space-y-6">
        {items.map((b) => (
          b.file ? (
            <a
              key={b.id}
              href={encodeURI(b.file)}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6 flex gap-6">
                <div className="w-40 h-40 md:w-44 md:h-44 bg-green-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M9 13h6M9 17h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-2xl leading-snug mb-2">{b.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-green-700 font-medium mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {b.date}
                  </div>
                  {b.excerpt && <p className="text-gray-700 leading-relaxed">{b.excerpt}</p>}
                </div>
              </div>
            </a>
          ) : (
            <div key={b.id} className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6 flex gap-6">
                <div className="w-40 h-40 md:w-44 md:h-44 bg-green-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M9 13h6M9 17h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-2xl leading-snug mb-2">{b.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-green-700 font-medium mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {b.date}
                  </div>
                  {b.excerpt && <p className="text-gray-700 leading-relaxed">{b.excerpt}</p>}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
