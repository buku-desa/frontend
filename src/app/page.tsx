import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Sistem Informasi Buku Desa
        </h1>
        <a href="/beranda"><p className="text-gray-600 mb-8">Portal Administrasi Desa</p></a>
        <div>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Masuk ke Portal Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
