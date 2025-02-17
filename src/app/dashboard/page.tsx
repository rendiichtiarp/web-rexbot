'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { ChartBarIcon, UserIcon, CreditCardIcon, CommandLineIcon } from '@heroicons/react/24/outline';

interface UserData {
  no_user: string;
  name: string;
  level: number;
  xp: number;
  coin: number;
  premium: boolean;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    setLoading(false);
  };

  if (!mounted || loading) {
    return <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData?.name}</h2>
              <p className="opacity-90">ID: {userData?.no_user}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm">
                {userData?.premium ? 'Premium User' : 'Free User'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
                <p className="text-2xl font-bold text-black dark:text-white">{userData?.level}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CommandLineIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">XP</p>
                <p className="text-2xl font-bold text-black dark:text-white">{userData?.xp}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Coin</p>
                <p className="text-2xl font-bold text-black dark:text-white">{userData?.coin}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  {userData?.premium ? 'Premium' : 'Free'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity or Additional Content */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {/* Placeholder content */}
            <p className="text-gray-600 dark:text-gray-400">Belum ada aktivitas</p>
          </div>
        </div>
      </main>
    </div>
  );
} 