"use client";
import { useMemo, useState } from "react";

export default function BukuPage() {
  const bukuData = useMemo(
    () => [
      {
        no: 1,
        judul:
          "PERATURAN KALURAHAN TENTANG RKP DESA Sendangsari 2021 NO.6",
        jenis: "Peraturan",
        tahun: "2021",
        tanggal_ditetapkan: "2021-01-01",
        file:
          "/PERATURAN KALURAHAN TENTANG RKP DESA Sendangsari 2021 NO.6.pdf",
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
    ],
    []
  );

  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    return [...bukuData]
      .filter((d) =>
        query
          ? `${d.judul} ${d.jenis} ${d.tahun}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : true
      )
      .sort(
        (a, b) =>
          new Date(b.tanggal_ditetapkan) - new Date(a.tanggal_ditetapkan)
      );
  }, [bukuData, query]);

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12" id="buku">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Buku Lembaran Desa</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari dokumen..."
          className="h-9 w-64 rounded-md border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <div className="space-y-6">
        {items.map((d) => (
          <div
            key={d.no}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
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
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {d.file ? (
                      <a
                        href={encodeURI(d.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-semibold text-black hover:underline"
                      >
                        {d.judul}
                      </a>
                    ) : (
                      <h3 className="text-2xl font-semibold text-black">{d.judul}</h3>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(d.tanggal_ditetapkan).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                      </span>
                      {d.jenis && <span>Jenis: {d.jenis}</span>}
                      {d.tahun && <span>Tahun: {d.tahun}</span>}
                    </div>
                  </div>
                  <div className="shrink-0 flex gap-3">
                    {d.file ? (
                      <a
                        href={encodeURI(d.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700"
                        aria-label="Lihat dokumen"
                        title="Lihat dokumen"
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
                    {d.file ? (
                      <a
                        href={encodeURI(d.file)}
                        download
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 text-white hover:bg-green-800"
                        aria-label="Unduh dokumen"
                        title="Unduh dokumen"
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
