import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../src/components/warga/Header'
import BukuCard from '../src/components/warga/BukuCard'

const bukuData = [
  {
    id: 1,
    title: 'PERATURAN KALURAHAN TENTANG RKP DESA Sendangsari 2022 NO.6',
    date: '2022',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
    downloads: 0,
  },
  {
    id: 2,
    title: 'PERKAL NO.1 TAHUN 2022 LAPORAN PERTANGGUNGJAWABAN',
    date: '2023',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
    downloads: 0,
  },
  {
    id: 3,
    title: 'Judul peraturan desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
    downloads: 0,
  },
  {
    id: 4,
    title: 'Judul peraturan desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
    downloads: 0,
  },
  {
    id: 5,
    title: 'Judul peraturan desa',
    date: '14 September 2025',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem hac nisi velit dignissim. Massa fringilla urna sed id. Lobortis vulputate morbi blandit feli.',
    downloads: 0,
  },
]

const BukuLembaranDesa: NextPage = () => {
  return (
    <>
      <Head>
        <title>Buku Lembaran Desa - Warga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Buku Lembaran Desa</h1>
        
        <div className="space-y-6">
          {bukuData.map((doc) => (
            <BukuCard
              key={doc.id}
              title={doc.title}
              date={doc.date}
              description={doc.description}
              downloads={doc.downloads}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default BukuLembaranDesa
