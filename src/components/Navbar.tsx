'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface UserData {
  name: string;
  no_user: string;
}

// Komponen NavLink untuk menu item
const NavLink = ({ href, isActive, children, onClick }: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-black dark:bg-white text-white dark:text-black'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// Menu items data
const menuItems = [
  { href: '/', label: 'Beranda', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/features', label: 'Fitur', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { href: '/commands', label: 'Perintah', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/price', label: 'Harga', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const closeDropdown = () => {
      if (showProfileMenu) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [showProfileMenu]);

  // Fungsi untuk mengecek path aktif
  const isActivePath = (path: string) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === path;
    }
    return false;
  };

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop Layout */}
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-black dark:text-white">RexBot</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                  isActivePath(item.href)
                    ? 'border-black dark:border-white text-black dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Profile & Theme Toggle */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileMenu(!showProfileMenu);
                  }}
                  className="flex items-center focus:outline-none group"
                >
                  <div className="relative">
                    <UserCircleIcon className="w-9 h-9 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-200" />
                    {isLoggedIn && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black" />
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all duration-200 origin-top-right">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {userData?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {userData?.no_user || ''}
                          </p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <UserCircleIcon className="w-4 h-4" />
                            <span>Dashboard</span>
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowProfileMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Login</span>
                          </div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span>Daftar</span>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none"
              aria-label="Menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className={`absolute w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`} />
                <span className={`absolute w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 sm:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)} 
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <span className="text-lg font-semibold text-black dark:text-white">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            {menuItems.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={isActivePath(item.href)}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                {item.label}
              </NavLink>
            ))}

            {/* Auth Section */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserCircleIcon className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 px-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-black dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 