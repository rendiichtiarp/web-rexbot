'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Deskripsi */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black dark:text-white">RexBot</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bot WhatsApp pintar yang siap membantu aktivitas grup dan personal chat Anda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-black dark:text-white">Tautan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="/commands" className="text-sm text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Perintah
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold mb-4 text-black dark:text-white">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
              <li>Email: support@rexbot.com</li>
              <li>WhatsApp: +62 812-3456-7890</li>
              <li>Telegram: @RexBotSupport</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-700 dark:text-gray-400">
          <p>© {currentYear} RexBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 