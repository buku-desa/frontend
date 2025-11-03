export default function Hero() {
  return (
    <section
      className="bg-cover bg-center"
      style={{ backgroundImage: "url('/jogja.png')" }}
    >
      <div className="bg-emerald-900/40">
        <div className="max-w-6xl mx-auto px-4 py-20 text-white">
          <h2 className="text-4xl font-extrabold drop-shadow">Kalurahan Caturtunggal</h2>
          <p className="mt-3 max-w-2xl text-lg text-emerald-100">
            Portal informasi warga untuk berita desa, buku lembaran, dan layanan publik.
          </p>
        </div>
      </div>
    </section>
  )
}
