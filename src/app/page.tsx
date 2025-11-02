'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // --- PERBAIKAN: State untuk Typewriter (di Kanan) ---
  const [typedSimba, setTypedSimba] = useState("");
  const fullSimba = "SIMBADES";
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(175);
  // --- AKHIR PERBAIKAN ---

  // Pengecekan status login dari localStorage
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      
      if (token && role) {
        setIsLoggedIn(true);
        setUserRole(role); // 'sekdes' atau 'kepdes'
      }
    };
    
    checkAuthStatus();
  }, []);

  // --- PERBAIKAN: useEffect untuk Typewriter dengan Hapus-Tulis ---
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
  }, [typedSimba, isDeleting, typeSpeed, fullSimba]); // Dependencies
  // --- AKHIR PERBAIKAN ---


  // Logika routing berdasarkan role
  const handleAdminPortalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userRole === 'sekdes') {
      window.location.href = '/sekdes/dashboard';
    } else if (userRole === 'kepdes') {
      window.location.href = '/kepdes/dashboard';
    } else {
      // Jika tidak login atau role tidak ada, ke halaman login
      window.location.href = '/login';
    }
  };

  const handleBerandaClick = () => {
    window.location.href = '/beranda';
  };

  return (
    // Struktur utama split-screen
    <div className="min-h-screen flex">
      
      {/* BAGIAN KIRI - Konten (45%) */}
      <div className="w-full lg:w-[45%] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Konten yang sebelumnya di tengah, sekarang di kiri */}
          <div className="text-center">
            {/* Logo atau Icon */}
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              SIMBADES
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-600 mb-8 text-l">
              Sistem Informasi Manajemen Buku dan Administrasi Desa
            </p>

            {/* Buttons */}
            <div className="space-y-4">
              {/* Button Masuk ke Beranda */}
              <button
                onClick={handleBerandaClick}
                className="w-full px-8 py-4 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Masuk ke Beranda
              </button>

              {/* Button Portal Admin */}
              <button
                onClick={handleAdminPortalClick}
                className="w-full px-8 py-4 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Masuk ke Portal Admin
              </button>
            </div>

            {/* Footer Text */}
            <p className="mt-8 text-sm text-gray-500">
              © 2025 SIMBADES. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN - Gambar Latar (55%) */}
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
        
        {/* Teks di atas gambar */}
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            {/* Teks - DIUBAH */}
            {/* Menambahkan min-h agar layout tidak lompat (CLS) */}
            <h2 className="text-4xl font-bold mb-1 drop-shadow-lg min-h-[3.5rem]">
              Selamat Datang di, {typedSimba}
              {/* Tambahkan kursor berkedip */}
              <span className="animate-pulse ml-1">|</span>
            </h2>
            <p className="text-xl drop-shadow-lg">
              Kelola manajemen buku dan administrasi desa dengan lebih mudah.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
