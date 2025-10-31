type Props = {
  title: string
  date: string
  description: string
  downloads: number
}

export default function BukuCard({ title, date, description, downloads }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start">
      {/* Image placeholder */}
      <div className="w-32 h-40 bg-amber-100 rounded-md flex-shrink-0 flex items-center justify-center">
        <svg className="w-16 h-16 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>
        <p className="mt-4 text-gray-700 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Lobortis vulputate morbi blandit feli.</span>
        </div>
      </div>
    </div>
  )
}
