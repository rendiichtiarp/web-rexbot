'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PhoneInput from '@/components/PhoneInput';

type LoginStep = 'INPUT_USER' | 'INPUT_OTP';

export default function Login() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<LoginStep>('INPUT_USER');
  const [formData, setFormData] = useState({
    no_user: '',
    otp: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validasi nomor
      const phoneNumber = formData.no_user.replace(/\D/g, '');
      
      // Ambil nomor saja tanpa kode negara
      const numberOnly = phoneNumber.replace(/^62/, '');

      // Validasi format nomor (harus dimulai dengan 8)
      if (!/^8[1-9][0-9]{8,11}$/.test(numberOnly)) {
        setMessage('Nomor tidak valid. Gunakan format 8xx');
        return;
      }

      // Format nomor dengan kode negara
      const cleanPhone = `62${numberOnly}`;

      const response = await fetch('/api/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ no_user: cleanPhone }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('INPUT_OTP');
        setMessage('Kode OTP telah dikirim ke WhatsApp Anda');
      } else {
        setMessage(data.message || 'Nomor WhatsApp tidak terdaftar');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan pada server');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const phoneNumber = formData.no_user.replace(/\D/g, '');
      const numberOnly = phoneNumber.replace(/^62/, '');
      const cleanPhone = `62${numberOnly}`;

      const formattedData = {
        no_user: cleanPhone,
        otp: formData.otp
      };

      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token ke localStorage
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
        setMessage('Login berhasil! Mengalihkan...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setMessage(data.message || 'Kode OTP tidak valid');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan pada server');
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
    </div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
            Login ke RexBot
          </h1>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 hover:scale-[1.01] transition-transform">
            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm ${
                message.includes('berhasil') || message.includes('dikirim')
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {message}
              </div>
            )}
            {step === 'INPUT_USER' ? (
              <form onSubmit={handleRequestOTP} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Nomor WhatsApp
                  </label>
                  <PhoneInput
                    value={formData.no_user}
                    onChange={(value) => setFormData({ ...formData, no_user: value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-[1.02] transition-all"
                >
                  Kirim OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Kode OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                    placeholder="Masukkan kode OTP"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-[1.02] transition-all"
                >
                  Verifikasi OTP
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Belum punya akun?{' '}
                <Link href="/signup" className="text-black dark:text-white font-medium hover:underline">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 