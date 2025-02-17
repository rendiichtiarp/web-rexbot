'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PhoneInput from '@/components/PhoneInput';

export default function SignUp() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    no_user: '',
    name: '',
    birth_date: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fungsi untuk menghitung umur
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Menghitung tanggal minimum dan maksimum
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 5); // Minimal umur 5 tahun
  
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 42); // Maksimal umur 42 tahun

  // Tambahkan fungsi untuk generate UID pendek
  const generateUID = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const randomStr = Math.random().toString(36).substring(2, 5); // 3 karakter random
    return `${timestamp}${randomStr}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validasi umur
      const age = calculateAge(formData.birth_date);
      if (age < 5) {
        setMessage('Umur minimal 5 tahun');
        return;
      }
      if (age > 42) {
        setMessage('Umur maksimal 42 tahun');
        return;
      }

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

      // Validasi nama
      if (!/^[A-Za-z\s.]+$/.test(formData.name)) {
        setMessage('Nama hanya boleh mengandung huruf, spasi, dan titik');
        return;
      }

      // Format data untuk dikirim ke server
      const formattedData = {
        uid: generateUID(),
        no_user: cleanPhone,
        name: formData.name,
        birth_date: formData.birth_date,
        birth_date_time: new Date(formData.birth_date).toISOString(),
        age: age,
        whatsapp: cleanPhone,
        registered: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      const response = await fetch('/api/daftar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Pendaftaran berhasil! Silahkan login.');
        setFormData({ no_user: '', name: '', birth_date: '' });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage(data.message || 'Terjadi kesalahan saat mendaftar');
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
            Daftar RexBot
          </h1>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 hover:scale-[1.01] transition-transform">
            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm ${
                message.includes('berhasil') 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
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
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-black dark:text-white">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <label htmlFor="birth_date" className="block text-sm font-medium mb-2 text-black dark:text-white">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="birth_date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  min={minDate.toISOString().split('T')[0]} // Format: YYYY-MM-DD
                  max={maxDate.toISOString().split('T')[0]}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                  required
                />
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                  Umur minimal 5 tahun dan maksimal 42 tahun
                </p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 mr-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-400">
                  Saya setuju dengan{' '}
                  <Link href="/terms" className="text-black dark:text-white font-medium hover:underline">
                    Syarat & Ketentuan
                  </Link>
                  {' '}dan{' '}
                  <Link href="/privacy" className="text-black dark:text-white font-medium hover:underline">
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-[1.02] transition-all"
              >
                Daftar
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-black dark:text-white font-medium hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 