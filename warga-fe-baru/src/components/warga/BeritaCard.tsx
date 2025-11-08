type Props = {
  title: string
  date?: string
}

export default function BeritaCard({ title, date }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start hover:shadow-lg transition snap-start min-w-[20rem] w-[20rem] h-[180px]">
      <div className="w-32 h-40 bg-green-600 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img src="/document.png" alt="document" className="w-12 h-12 object-contain" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-4">{title}</h3>
        <div className="text-xs text-gray-500 mt-auto">{date ?? '14 September 2025'}</div>
      </div>
    </div>
  )
}
