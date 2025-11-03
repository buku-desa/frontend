import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../src/components/warga/Header'
import bukuData from '../src/data/bukuData'

function normalizeKey(s?: string | number) {
  if (s === undefined || s === null) return ''
  return String(s)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '') // remove extension
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function resolveDoc(param?: string | string[] | number) {
  if (!param) return undefined
  const p = Array.isArray(param) ? param[0] : String(param)

  // if begins with an id like "123-...", try numeric id first
  const leading = p.split('-')[0]
  if (/^\d+$/.test(leading)) {
    const byId = bukuData.find((b) => String(b.id) === leading)
    if (byId) return byId
  }

  // try exact numeric id
  if (/^\d+$/.test(p)) {
    const byId = bukuData.find((b) => String(b.id) === p)
    if (byId) return byId
  }

  const key = normalizeKey(p)

  // match by normalized title
  const byTitle = bukuData.find((b) => normalizeKey(b.title) === key)
  if (byTitle) return byTitle

  // match by pdf filename (without extension)
  const byPdfName = bukuData.find((b) => normalizeKey((b.pdfUrl || '').split('/').pop()) === key)
  if (byPdfName) return byPdfName

  // fallback: try contains
  return bukuData.find((b) => normalizeKey(b.title).includes(key) || (b.pdfUrl || '').toLowerCase().includes(p.toLowerCase()))
}

const BukuLembaranPdf: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const doc = resolveDoc(id)

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
              src={encodeURI(pdfUrl)}
              title={doc ? doc.title : 'PDF Viewer'}
              width="100%"
              height="100%"
              className="border-0"
            />
          </div>
        </div>

        <div className="mt-4">
          <a
            href={encodeURI(pdfUrl)}
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
