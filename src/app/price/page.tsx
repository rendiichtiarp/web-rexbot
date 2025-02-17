'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const plans = [
  {
    name: "Free",
    price: "Rp 0",
    period: "Selamanya",
    description: "Akses fitur dasar untuk pengguna umum",
    features: [
      "Stiker maker basic",
      "Game & entertainment",
      "Downloader basic",
      "Group management basic",
      "AI Chat (limit 10/hari)",
      "Tools & search basic"
    ],
    button: {
      text: "Daftar Gratis",
      link: "/signup"
    }
  },
  {
    name: "Premium",
    price: "Rp 15.000",
    period: "30 Hari",
    description: "Akses penuh ke semua fitur premium",
    features: [
      "Semua fitur Free",
      "Unlimited AI Chat & Image",
      "Premium downloader",
      "NSFW content",
      "Prioritas response",
      "Premium support"
    ],
    featured: true,
    button: {
      text: "Beli Premium",
      link: "https://wa.me/6281234567890?text=Saya%20ingin%20membeli%20Premium"
    }
  },
  {
    name: "Business",
    price: "Rp 50.000",
    period: "30 Hari",
    description: "Untuk kebutuhan bisnis & komunitas",
    features: [
      "Semua fitur Premium",
      "Multi grup support",
      "Custom auto responder",
      "Broadcast ke member",
      "Analytics & report",
      "Dedicated support"
    ],
    button: {
      text: "Hubungi Kami",
      link: "https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20paket%20Business"
    }
  }
];

const paymentMethods = [
  {
    name: "DANA",
    number: "081234567890",
    owner: "REXBOT"
  },
  {
    name: "OVO",
    number: "081234567890",
    owner: "REXBOT"
  },
  {
    name: "GoPay",
    number: "081234567890",
    owner: "REXBOT"
  },
  {
    name: "Bank BCA",
    number: "1234567890",
    owner: "REXBOT"
  }
];

export default function Price() {
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
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black dark:text-white">
            Pilih Paket Sesuai Kebutuhan
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            Tingkatkan pengalaman chatting Anda dengan fitur premium RexBot
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 hover:scale-[1.02] transition-transform ${
                plan.featured ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-black dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mt-4">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm text-black dark:text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.button.link}
                target={plan.button.link.startsWith('http') ? '_blank' : '_self'}
                className={`block w-full text-center py-3 rounded-full text-sm font-medium transition-all hover:scale-[1.02] ${
                  plan.featured
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                }`}
              >
                {plan.button.text}
              </Link>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">Metode Pembayaran</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 hover:scale-[1.01] transition-transform">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-lg font-bold text-black dark:text-white">
                    {method.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">{method.name}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-400">{method.number}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-400">a.n {method.owner}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 