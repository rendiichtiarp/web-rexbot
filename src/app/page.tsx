'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const features = [
  {
    title: "AI Chat & Image",
    description: "Berbagai model AI untuk chat dan generate gambar",
    icon: "🤖"
  },
  {
    title: "Downloader",
    description: "Download media dari berbagai platform",
    icon: "📥"
  },
  {
    title: "Game & Fun",
    description: "Game seru dan fitur hiburan",
    icon: "🎮"
  }
];

const stats = [
  { number: "190+", label: "Fitur" },
  { number: "50K+", label: "Pengguna" },
  { number: "100K+", label: "Perintah/Hari" },
  { number: "99.9%", label: "Uptime" }
];

export default function Home() {
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
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-black dark:text-white">
            Bot WhatsApp Pintar untuk Semua
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
            RexBot hadir dengan 190+ fitur untuk memudahkan aktivitas chat personal dan grup Anda
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
              Mulai Sekarang
            </Link>
            <Link
              href="/features"
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Lihat Fitur
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-black dark:text-white">
                {stat.number}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl mb-6 text-black dark:text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Siap Mencoba RexBot?
            </h2>
            <p className="mb-8 text-black">
              Daftar sekarang dan nikmati semua fitur canggih RexBot
            </p>
            <Link
              href="/signup"
              className="inline-flex bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
