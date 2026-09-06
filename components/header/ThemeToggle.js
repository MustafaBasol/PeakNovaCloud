'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import IconRenderer from '../IconRenderer'

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false)
  const t = useTranslations('Header')

  useEffect(() => {
    // Synced once on mount to match the class the no-flash inline
    // script (app/[locale]/layout.js) already applied before hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={isDark ? t('lightMode') : t('darkMode')}
      className={`flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--primary] focus-visible:outline-offset-2 rounded ${className}`}
    >
      <IconRenderer iconName={isDark ? 'MdOutlineLightMode' : 'MdOutlineDarkMode'} className='w-6 h-6' />
    </button>
  )
}
