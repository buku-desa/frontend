import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import BeritaCardHorizontal from '../components/BeritaCardHorizontal'

const mockBerita = [
  {
    id: 1,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
  {
    id: 2,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
  {
    id: 3,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
  {
    id: 4,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
  {
    id: 5,
    title: 'Judul berita desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
  },
]

const BeritaDesa: NextPage = () => {
  return (
    <>
      <Head>
        <title>Berita Desa - Warga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Berita Desa</h1>
        
        <div className="space-y-4">
          {mockBerita.map((berita, index) => (
            <BeritaCardHorizontal
              key={berita.id}
              title={berita.title}
              date={berita.date}
              description={berita.description}
              isHighlighted={index === 0}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default BeritaDesa
