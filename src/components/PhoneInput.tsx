'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const countries = [
  { 
    code: 'ID', 
    name: 'Indonesia', 
    dialCode: '+62',
    format: '81234567890',
    startsWith: ['8'],
    minLength: 10,
    maxLength: 13
  },
  { 
    code: 'MY', 
    name: 'Malaysia', 
    dialCode: '+60',
    format: '123456789',
    startsWith: ['1', '3', '4', '5', '6', '7', '8', '9'],
    minLength: 9,
    maxLength: 10
  },
  { 
    code: 'SG', 
    name: 'Singapore', 
    dialCode: '+65',
    format: '81234567',
    startsWith: ['8', '9'],
    minLength: 8,
    maxLength: 8
  },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function PhoneInput({ value, onChange, required = false }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [error, setError] = useState('');

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneNumber = e.target.value.replace(/\D/g, '');
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1);
    }
    
    // Validasi nomor
    if (phoneNumber && !selectedCountry.startsWith.includes(phoneNumber[0])) {
      setError(`Nomor ${selectedCountry.name} harus dimulai dengan ${selectedCountry.startsWith.join(' atau ')}`);
    } else if (phoneNumber.length > selectedCountry.maxLength) {
      setError(`Nomor terlalu panjang (maks. ${selectedCountry.maxLength} digit)`);
    } else {
      setError('');
    }

    onChange(selectedCountry.dialCode.replace('+', '') + phoneNumber);
  };

  const displayValue = value ? value.replace(selectedCountry.dialCode.replace('+', ''), '') : '';

  return (
    <div className="space-y-1 w-full">
      <div className="flex w-full">
        {/* Country selector */}
        <div className="relative shrink-0">
          <button
            type="button"
            className="h-[46px] px-3 sm:px-4 inline-flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm sm:text-base">{selectedCountry.dialCode}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              <ul className="py-1">
                {countries.map((country) => (
                  <li key={country.code}>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{country.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{country.dialCode}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Phone input */}
        <input
          type="tel"
          value={displayValue}
          onChange={handlePhoneChange}
          className="flex-1 min-w-0 h-[46px] px-3 sm:px-4 bg-white dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
          placeholder={selectedCountry.format}
          required={required}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">
          {error}
        </p>
      )}

      {/* Format hint */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Contoh: {selectedCountry.dialCode} {selectedCountry.format}
      </p>
    </div>
  );
} 