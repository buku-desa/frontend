type Row = { 
  no: number
  judul: string
  jenis: string
  tahun: number
}

export default function BukuTable({ rows }: { rows: Row[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">NO</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">JUDUL</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">JENIS</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">TAHUN</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">AKSI</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((item) => (
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
                  <button className="bg-emerald-700 text-white p-2 rounded hover:bg-emerald-800">
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
  )
}
