import { FileText } from 'lucide-react'

type Props = {
  title: string
  date?: string
}

export default function BeritaCard({ title, date = '14 September 2025' }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex gap-4 items-center min-w-[280px]">
      {/* Icon Document dengan background hijau muda */}
      <div className="w-20 h-20 bg-green-50 rounded-lg shrink-0 flex items-center justify-center border border-green-100">
        <FileText className="w-10 h-10 text-green-600" strokeWidth={1.5} />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
      </div>
    </div>
  )
}