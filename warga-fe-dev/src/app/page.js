import Image from "next/image";

export default function Home() {
  const beritaData = [
    {
      id: 1,
      title: "Blaalalalalalala yayaaa",
      date: "14 September 2025",
    },
    {
      id: 2,
      title: "Blaalalalalalala yayaaa",
      date: "14 September 2025",
    },
    {
      id: 3,
      title: "Blaalalalalalala yayaaa",
      date: "14 September 2025",
    },
    {
      id: 4,
      title: "Blaalalalalalala yayaaa",
      date: "14 September 2025",
    },
  ];

  const bukuData = [
    {
      no: 1,
      judul: "Perdes Yogya Nomor 6 tentang RKP Desa tahun 2022",
      jenis: "Peraturan",
      tahun: 2022,
    },
    {
      no: 2,
      judul: "Peraturan Desa Yogya Nomor 01 tahun 2022 Tentang Laporan Pertanggungjawaban",
      jenis: "Peraturan",
      tahun: 2023,
    },
    {
      no: 3,
      judul: "Perdes Yogya Nomor 6 tentang RKP Desa tahun 2022",
      jenis: "Peraturan",
      tahun: 2024,
    },
    {
      no: 4,
      judul: "Perdes Yogya Nomor 6 tentang RKP Desa tahun 2022",
      jenis: "",
      tahun: "",
    },
    {
      no: 5,
      judul: "Perdes Yogya Nomor 6 tentang RKP Desa tahun 2022",
      jenis: "",
      tahun: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Beranda</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Buku Lembaran Desa</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Berita Desa</a>
          </nav>
          <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800">
            Log in Admin
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
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
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Berita Desa</h2>
          <a href="#" className="text-black-000 hover:text-gray-800 flex items-center gap-2">
            Lihat Semua
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beritaData.map((berita) => (
            <div key={berita.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div>
                <div className="text-center">
                  <div className="w-auto h-auto mx-auto mb-2 overflow-hidden rounded-xl ">
                    <Image
                      src="/avatar.png"
                      alt="avatar"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-2">{berita.title}</h3>
                <div className="flex items-center gap-2 text-sm text-black">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {berita.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buku Lembaran Desa Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Buku Lembaran Desa
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-base">Tampilkan</span>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white">
                <option>5</option>
                <option>10</option>
                <option>25</option>
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span className="text-base">Entri</span>
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
              {bukuData.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{item.no}</td>
                  <td className="px-6 py-4 text-sm">{item.judul}</td>
                  <td className="px-6 py-4 text-sm">{item.jenis}</td>
                  <td className="px-6 py-4 text-sm">{item.tahun}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="bg-green-700 text-white p-2 rounded hover:bg-green-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
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