import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {

  const t = await getTranslations('NotFound')

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-700 mb-2">{t('notFound')}</h2>
      <p className="text-center text-gray-600 mb-8">
        {t('move')}
      </p>
      <Link href="/">
        <h6 className="px-6 py-3 bg-[--primary] text-white rounded-md hover:bg-[--text] transition duration-300">
          {t('back')}
        </h6>
      </Link>
    </div>
  );
}
