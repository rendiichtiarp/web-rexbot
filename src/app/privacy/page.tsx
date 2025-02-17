'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function Privacy() {
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Kebijakan Privasi</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nomor WhatsApp</li>
              <li>Nama pengguna</li>
              <li>Tanggal lahir</li>
              <li>Data penggunaan bot</li>
              <li>Riwayat transaksi (untuk pengguna premium)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Penggunaan Informasi</h2>
            <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Menyediakan layanan bot WhatsApp</li>
              <li>Meningkatkan pengalaman pengguna</li>
              <li>Mengirim notifikasi penting</li>
              <li>Mencegah penyalahgunaan layanan</li>
              <li>Analisis dan pengembangan fitur</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Perlindungan Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Data disimpan dengan enkripsi yang aman</li>
              <li>Akses data dibatasi hanya untuk keperluan layanan</li>
              <li>Pembaruan keamanan rutin</li>
              <li>Backup data berkala</li>
              <li>Monitoring sistem 24/7</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Hak Pengguna</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Mengakses data pribadi</li>
              <li>Memperbarui informasi</li>
              <li>Meminta penghapusan data</li>
              <li>Membatasi penggunaan data</li>
              <li>Mengunduh data pribadi</li>
            </ul>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </main>
    </div>
  );
} 