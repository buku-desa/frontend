"use client";

import { useState, useEffect } from "react";
// import Link from "next/link"; // Dihapus untuk memperbaiki error
// import { useRouter } from "next/navigation"; // Dihapus untuk memperbaiki error

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // 1. State baru untuk pesan error
  // const router = useRouter(); // Dihapus untuk memperbaiki error

  // --- State untuk Typewriter (Sama seperti page.tsx) ---
  const [typedSimba, setTypedSimba] = useState("");
  const fullSimba = "SIMBADES";
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);
  // --- Akhir State Typewriter ---

  // --- Logika Typewriter (Sama seperti page.tsx) ---
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleTyping = () => {
      if (isDeleting) {
        // Mode menghapus
        setTypedSimba(prev => prev.substring(0, prev.length - 1));
        setTypeSpeed(prev => Math.max(120, prev - 10)); // Mempercepat hapus
      } else {
        // Mode menulis
        setTypedSimba(prev => fullSimba.substring(0, prev.length + 1));
        setTypeSpeed(prev => Math.max(120, prev - 10)); // Mempercepat tulis
      }
    };

    const currentText = typedSimba;

    if (!isDeleting && currentText.length === fullSimba.length) {
      // Selesai menulis, tunggu sebentar lalu mulai menghapus
      timeoutId = setTimeout(() => setIsDeleting(true), 5000); // Tunggu 5 detik
    } else if (isDeleting && currentText.length === 0) {
      // Selesai menghapus, tunggu sebentar lalu mulai menulis lagi
      setIsDeleting(false);
      timeoutId = setTimeout(() => setTypeSpeed(150), 500); // Tunggu sebentar sebelum mulai menulis lagi
    } else {
      // Lanjutkan mengetik/menghapus
      timeoutId = setTimeout(handleTyping, typeSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [typedSimba, isDeleting, typeSpeed, fullSimba]);
  // --- Akhir Logika Typewriter ---

  // --- 2. Logika Login (Diperbarui dengan Akun Dummy) ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Hapus error sebelumnya

    // Simulate login process
    // --- BLOK YANG DIPERBAIKI ---
    setTimeout(() => {
      // --- Akun Dummy ---
      if (username === "kepdes" && password === "123") {
        // Login sebagai Kepala Desa
        localStorage.setItem('authToken', 'dummy-token-kepdes');
        localStorage.setItem('userRole', 'kepdes');
        localStorage.setItem('username', 'kepdes'); // atau nama lengkap
        window.location.href = "/kepdes/dashboard";

      } else if (username === "sekdes" && password === "123") {
        // Login sebagai Sekretaris Desa
        localStorage.setItem('authToken', 'dummy-token-sekdes');
        localStorage.setItem('userRole', 'sekdes');
        localStorage.setItem('username', 'sekdes'); // atau nama lengkap
        window.location.href = "/sekdes/dashboard";
      
      } else {
        // Login Gagal
        setError("Username atau password salah.");
        setIsLoading(false); // Berhenti loading jika gagal
      }
    }, 1000);
  }; // <-- Kurung kurawal penutup ditambahkan
  // --- Akhir Logika Login ---

  return (
    <div className="min-h-screen flex">
      {/* BAGIAN KIRI - White Box Full Height */}
      <div className="w-full lg:w-[45%] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          
          {/* Logo/Icon (DISAMAKAN DENGAN page.tsx) */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-white"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Log in
          </h1>
          
          {/* Subtitle (DISAMAKAN DENGAN page.tsx) */}
          <p className="text-center text-gray-600 mb-8 text-lg">
            Portal Administrasi SIMBADES
          </p>

          {/* 3. Tampilan Pesan Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium text-gray-700 uppercase mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Isi Username Anda"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 uppercase mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Isi Password Anda"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-semibold text-base transition-all duration-300 mt-6 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            {/* <Link> diganti menjadi <a> */}
            <a 
              href="/" 
              className="text-sm text-gray-600 hover:text-green-700 transition-colors inline-flex items-center gap-1"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Kembali ke Halaman Portal
            </a>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN - Background Image Full Height */}
      <div 
        className="hidden lg:block lg:w-[55%] relative"
        style={{
          backgroundImage: 'url(/welcome/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay untuk contrast */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Teks di atas gambar (DENGAN TYPEWRITER) */}
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-1 drop-shadow-lg min-h-[3.5rem]">
              {typedSimba}
              {/* Kursor berkedip */}
              <span className="animate-pulse ml-1">|</span>
            </h2>
            <p className="text-xl drop-shadow-lg">
              Sistem Informasi Manajemen Buku dan Administrasi Desa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

