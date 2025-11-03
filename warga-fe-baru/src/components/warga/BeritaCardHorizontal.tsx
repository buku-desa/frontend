import { ReactNode } from 'react'

type Props = {
  title: string | ReactNode
  date: string
  description: string | ReactNode
  isHighlighted?: boolean
}

export default function BeritaCardHorizontal({ title, date, description, isHighlighted = false }: Props) {
  return (
   <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start hover:shadow-lg transition snap-start min-w-[20rem]">
        {/* Image placeholder */}
        <div className="w-32 h-40 bg-green-700 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
          <img src="/document.png" alt="document" className="w-16 h-16 object-contain" />
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
