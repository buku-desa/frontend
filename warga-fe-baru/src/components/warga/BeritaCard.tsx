type Props = {
  title: string
  date?: string
}

export default function BeritaCard({ title, date = '14 September 2025' }: Props) {
  return (
    <div className="card flex gap-4 items-center">
      <div className="w-20 h-20 bg-amber-100 rounded-md flex-shrink-0" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="text-xs text-gray-500 mt-2">{date}</div>
      </div>
    </div>
  )
}
