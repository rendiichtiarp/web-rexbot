'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const features = [
  {
    title: "AI Chat & Image",
    description: "Berbagai model AI untuk chat dan generate gambar",
    items: [
      "ChatGPT, Bard, Claude, Gemini, dll",
      "Stable Diffusion, DALL-E, Midjourney style",
      "Anime style image generation",
      "Image to prompt & editing"
    ],
    icon: "🤖"
  },
  {
    title: "Downloader",
    description: "Download media dari berbagai platform",
    items: [
      "YouTube video & audio",
      "Instagram post & reels",
      "TikTok video tanpa watermark",
      "Facebook, Twitter, Threads",
      "Spotify, SoundCloud music"
    ],
    icon: "📥"
  },
  {
    title: "Game & Fun",
    description: "Game seru dan fitur hiburan",
    items: [
      "25+ game quiz & tebak-tebakan",
      "Random meme & jokes",
      "Anime & waifu images",
      "Dukun & ramalan bercanda",
      "Simsimi chat bot"
    ],
    icon: "🎮"
  },
  {
    title: "Group Management",
    description: "Kelola grup WhatsApp dengan mudah",
    items: [
      "Welcome & goodbye message",
      "Anti link & spam",
      "Auto responder",
      "Voting & polling",
      "Broadcast & pengumuman"
    ],
    icon: "👥"
  },
  {
    title: "Sticker & Maker",
    description: "Buat stiker dan media kreatif",
    items: [
      "Stiker dari gambar/video",
      "Custom watermark sticker",
      "Emoji mix sticker",
      "Quote & meme maker",
      "Text to image"
    ],
    icon: "🎨"
  },
  {
    title: "Tools & Search",
    description: "Alat bantu dan pencarian",
    items: [
      "Google & Wikipedia search",
      "Translator 100+ bahasa",
      "Al-Quran & jadwal sholat",
      "Lirik lagu & chord gitar",
      "Cuaca & info gempa"
    ],
    icon: "🛠️"
  }
];

export default function Features() {
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black dark:text-white">
            Fitur Lengkap RexBot
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Bot WhatsApp dengan 190+ fitur untuk memudahkan aktivitas chat personal dan grup Anda
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/commands"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
              Lihat Semua Perintah
            </Link>
            <Link
              href="/signup"
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Premium Banner */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center text-black">
            <h2 className="text-2xl font-bold mb-4">Upgrade ke Premium</h2>
            <p className="mb-8">Dapatkan akses ke semua fitur premium dan prioritas penggunaan bot</p>
          </div>
        </div>
      </main>
    </div>
  );
} 