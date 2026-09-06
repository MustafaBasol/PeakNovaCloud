'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Error({ error, reset }) {
  const t = useTranslations('Error')
  const locale = useLocale()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-white dark:bg-gray-900 text-center">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('title')}</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {t('message')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 bg-[--primary] text-white rounded-md hover:bg-[--hovered] transition duration-300"
        >
          {t('retry')}
        </button>
        <Link
          href={`/${locale}`}
          className="px-6 py-3 border-2 border-[--primary] text-[--primary] dark:text-white rounded-md hover:bg-[--light] dark:hover:bg-white/10 transition duration-300"
        >
          {t('back')}
        </Link>
      </div>
    </div>
  )
}
