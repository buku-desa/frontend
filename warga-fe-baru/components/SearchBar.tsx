export default function SearchBar() {
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-10">
      <div className="bg-white rounded-full shadow-md p-3 flex items-center gap-3">
        <input className="flex-1 px-4 py-2 rounded-full outline-none" placeholder="Cari judul, nomor, atau jenis dokumen" />
        <button className="p-2 rounded-full bg-emerald-600 text-white">Search</button>
      </div>
    </div>
  )
}
