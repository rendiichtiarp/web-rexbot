'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function Terms() {
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
          <h1 className="text-3xl font-bold mb-8">Syarat dan Ketentuan</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Pendaftaran dan Penggunaan</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pengguna wajib berusia minimal 13 tahun</li>
              <li>Nomor WhatsApp yang didaftarkan harus aktif dan merupakan nomor pribadi</li>
              <li>Satu nomor WhatsApp hanya dapat didaftarkan untuk satu akun</li>
              <li>Pengguna bertanggung jawab atas keamanan akun masing-masing</li>
              <li>RexBot berhak menonaktifkan akun yang melanggar ketentuan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Penggunaan Bot</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bot hanya dapat digunakan untuk tujuan yang legal dan tidak melanggar hukum</li>
              <li>Dilarang menggunakan bot untuk spam atau mengganggu pengguna lain</li>
              <li>Dilarang menyebarkan konten SARA, pornografi, atau konten berbahaya lainnya</li>
              <li>Penggunaan fitur bot harus sesuai dengan panduan yang diberikan</li>
              <li>Bot dapat digunakan di grup dengan izin admin grup</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Batasan dan Tanggung Jawab</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>RexBot tidak bertanggung jawab atas kerugian yang timbul dari penggunaan bot</li>
              <li>Pengguna free memiliki batasan penggunaan fitur sesuai ketentuan</li>
              <li>Pengguna premium mendapat akses penuh ke semua fitur</li>
              <li>Bot dapat mengalami pemeliharaan atau gangguan teknis sewaktu-waktu</li>
              <li>Fitur bot dapat berubah atau diperbarui tanpa pemberitahuan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Privasi dan Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>RexBot akan menjaga kerahasiaan data pengguna</li>
              <li>Data yang dikumpulkan hanya digunakan untuk keperluan layanan</li>
              <li>Pengguna menyetujui pengumpulan dan penggunaan data sesuai kebijakan privasi</li>
              <li>Data pengguna tidak akan dijual atau dibagikan ke pihak ketiga</li>
              <li>Pengguna dapat meminta penghapusan data sesuai prosedur yang berlaku</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Perubahan Ketentuan</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>RexBot berhak mengubah syarat dan ketentuan sewaktu-waktu</li>
              <li>Perubahan akan diinformasikan melalui website atau WhatsApp</li>
              <li>Penggunaan berkelanjutan berarti menyetujui perubahan ketentuan</li>
              <li>Pengguna disarankan membaca ketentuan secara berkala</li>
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