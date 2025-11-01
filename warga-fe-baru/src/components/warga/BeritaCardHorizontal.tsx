type Props = {
  title: string
  date: string
  description: string
  isHighlighted?: boolean
}

export default function BeritaCardHorizontal({ title, date, description, isHighlighted = false }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 flex gap-4 items-start ${isHighlighted ? 'ring-2 ring-emerald-200' : ''}`}>
      {/* Image placeholder */}
      <div className="w-24 h-24 bg-amber-100 rounded-md flex-shrink-0 flex items-center justify-center">
        <svg className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-emerald-600">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
