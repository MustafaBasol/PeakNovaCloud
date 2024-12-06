import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-center text-gray-600 mb-8">
        Üzgünüz, aradığınız sayfa mevcut değil veya taşındı.
      </p>
      <Link href="/">
        <h6 className="px-6 py-3 bg-[--primary] text-white rounded-md hover:bg-[--text] transition duration-300">
          Ana sayfaya dönün
        </h6>
      </Link>
    </div>
  );
}