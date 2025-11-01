import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../src/components/warga/Header'
import bukuData from '../../src/data/bukuData'

const BukuDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const doc = bukuData.find((b) => String(b.id) === String(id))

  if (!doc) {
    return (
      <>
        <Head>
          <title>Dokumen tidak ditemukan</title>
        </Head>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Dokumen tidak ditemukan</h1>
          <p className="mt-4 text-gray-600">Dokumen yang diminta tidak tersedia.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{doc.title} - Buku Lembaran Desa</title>
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{doc.title}</h1>
        <div className="text-sm text-gray-600 mb-6">{doc.date}</div>

        <div className="bg-white rounded shadow overflow-hidden">
          {/* Embed PDF using iframe; external URL is stored in data */}
          <div style={{ height: '720px' }}>
            <iframe
              src={doc.pdfUrl}
              title={doc.title}
              width="100%"
              height="100%"
              className="border-0"
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default BukuDetail
