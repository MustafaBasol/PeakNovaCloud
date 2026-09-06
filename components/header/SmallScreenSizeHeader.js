'use client'
import React, { useState } from 'react'
import IconRenderer from '../IconRenderer';
import SmallMenu from './SmallMenu';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollLink from '../ScrollLink';
import { useTranslations } from 'next-intl';
import { useBodyScrollLock } from '@/libs/useBodyScrollLock';
import ThemeToggle from './ThemeToggle';

export default function SmallScreenSizeHeader({ data, locale }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const t = useTranslations('Header')

    useBodyScrollLock(isMenuOpen)

    const click = () => {
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className='flex justify-between items-center flex-row px-8 md:hidden h-full'>
          <ScrollLink href={`/${locale}`} className=' cursor-pointer'>
            <Image
              src='/logo.png'
              width={90}
              height={90}
              alt='logo'
            />
          </ScrollLink>
        <div className='flex items-center gap-4'>
          <ThemeToggle className='h-8 w-8' />
          <button
            type='button'
            onClick={click}
            aria-label={t('menu')}
            aria-expanded={isMenuOpen}
            className='focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--primary] focus-visible:outline-offset-2 rounded'
          >
            <IconRenderer iconName={isMenuOpen ? 'IoMdClose' : 'RxHamburgerMenu'} className='h-12 w-12 cursor-pointer' />
          </button>
        </div>
            <AnimatePresence>
                {
                  isMenuOpen
                  &&
                  <SmallMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} data={data} locale={locale} />
                }
            </AnimatePresence>

    </div>
  )
}
