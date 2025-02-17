'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
    </div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-9xl font-bold text-black dark:text-white mb-4">
            404
          </div>
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
          <Link 
            href="/"
            className="inline-flex bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
} 