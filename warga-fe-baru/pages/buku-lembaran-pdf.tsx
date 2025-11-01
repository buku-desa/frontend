import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../src/components/warga/Header'
import bukuData from '../src/data/bukuData'

const BukuLembaranPdf: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const doc = bukuData.find((b) => String(b.id) === String(id))

  // default PDF if id not provided or not found
  const pdfUrl = doc?.pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

  return (
    <>
      <Head>
        <title>{doc ? `${doc.title} - Viewer` : 'Viewer PDF'}</title>
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{doc ? doc.title : 'Preview PDF'}</h1>
          {doc && <div className="text-sm text-gray-600">{doc.date}</div>}
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <div style={{ height: '720px' }}>
            <iframe
              src={pdfUrl}
              title={doc ? doc.title : 'PDF Viewer'}
              width="100%"
              height="100%"
              className="border-0"
            />
          </div>
        </div>

        <div className="mt-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white rounded-md"
          >
            Buka PDF di tab baru / Unduh
          </a>
        </div>
      </main>
    </>
  )
}

export default BukuLembaranPdf
