import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../src/components/warga/LoginForm'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - Warga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-emerald-800">Masuk ke Warga</h2>
            <p className="mt-2 text-sm text-gray-600">Masukkan akunmu untuk mengelola konten desa</p>
          </div>

          <div className="mt-6">
            <LoginForm />
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Belum punya akun? <Link href="#" className="text-emerald-600 hover:underline">Daftar</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
