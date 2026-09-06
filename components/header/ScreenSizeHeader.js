'use client'
import { motion, AnimatePresence } from 'framer-motion'
import IconRenderer from '../IconRenderer';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ServiceMenu from './ServiceMenu';
import { useTranslations } from 'next-intl';
import ScrollLink from '../ScrollLink';
import LanguageMenu from './LanguageMenu';
import { useClickOutside } from '@/libs/useClickOutside';
import ThemeToggle from './ThemeToggle';

export default function ScreenSizeHeader({ data, locale }) {

  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const serviceTriggerRef = useRef(null)
  const serviceMenuRef = useRef(null)
  const languageTriggerRef = useRef(null)
  const languageMenuRef = useRef(null)

  useClickOutside([serviceTriggerRef, serviceMenuRef], () => setIsServiceMenuOpen(false), isServiceMenuOpen)
  useClickOutside([languageTriggerRef, languageMenuRef], () => setIsLanguageMenuOpen(false), isLanguageMenuOpen)

  const pathname = usePathname()
  const router = useRouter()

  const t = useTranslations("Header")

  const nav = (path) => {
    const contact = document.getElementById(`${path}-contact`)
    if (contact) {
      contact.scrollIntoView({ behavior:'smooth' })
    } else {
      router.push(`/${locale}#home-contact`)
    }
  }

  const click = () => {
    if(pathname.includes('about')) {
      nav('about')
      return
    }
    if(pathname.includes('projects')) {
        nav('project')
        return
    }
    if(pathname.includes('services')) {
      nav('service')
      return
    }
    if(pathname.includes('blogs/')) {
      nav('single')
      return
    }
    if(pathname.includes('blogs')) {
      nav('blogs')
      return
    }
    if(pathname.includes(locale)) {
      nav('home')
      return
    }
    nav('home')
  }

  const closeOnEscape = (event, close) => {
    if (event.key === 'Escape') close()
  }

  return (
    <>
      <div className='md:flex items-center justify-between gap-8 w-full mx-auto hidden'>
          <ScrollLink href={`/${locale}`} className='pl-4'>
            <Image
              src='/logo.png'
              width={90}
              height={90}
              alt='logo'
            />
          </ScrollLink>
          <div className='flex gap-8 h-24'>
              <motion.button
                  ref={serviceTriggerRef}
                  type='button'
                  aria-haspopup='true'
                  aria-expanded={isServiceMenuOpen}
                  aria-controls='service-menu'
                  className='flex items-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--primary] focus-visible:outline-offset-2 rounded'
                  onHoverStart={()=>setIsServiceMenuOpen(true)}
                  onHoverEnd={()=>setIsServiceMenuOpen(false)}
                  onClick={()=>setIsServiceMenuOpen(!isServiceMenuOpen)}
                  onKeyDown={(e)=>closeOnEscape(e, ()=>setIsServiceMenuOpen(false))}
              >
                  <span className='text-base'>{t('service')}</span>
                  <IconRenderer className='w-4 h-4' iconName='MdOutlineExpandMore' />
              </motion.button>
              <ScrollLink href={`/${locale}/projects`} className='flex items-center'>
                <h6 className='cursor-pointer text-base'>{t('project')}</h6>
              </ScrollLink>
              <div className='flex items-center'>
              <ScrollLink href={`/${locale}/about`} className='flex items-center'>
                <h6
                  className='cursor-pointer text-base'
                >
                  {t('about')}
                </h6>
              </ScrollLink>
              </div>
              <div className='flex items-center'>
              <ScrollLink href={`/${locale}/blogs`} className='flex items-center'>
                <h6
                  className='cursor-pointer text-base'
                >
                  {t('blog')}
                </h6>
              </ScrollLink>
              </div>
          </div>
          <div className='flex items-center gap-2 relative h-24 mr-4'>
            <motion.button
              ref={languageTriggerRef}
              type='button'
              aria-label={t('language')}
              aria-haspopup='true'
              aria-expanded={isLanguageMenuOpen}
              className='flex items-center cursor-pointer h-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--primary] focus-visible:outline-offset-2 rounded'
              onHoverStart={()=>setIsLanguageMenuOpen(true)}
              onHoverEnd={()=>setIsLanguageMenuOpen(false)}
              onClick={()=>setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              onKeyDown={(e)=>closeOnEscape(e, ()=>setIsLanguageMenuOpen(false))}
            >
              <IconRenderer className='w-8 h-8' iconName='RiGlobalLine' />
            </motion.button>
            <AnimatePresence>
              {
                isLanguageMenuOpen
                &&
                <div ref={languageMenuRef}>
                  <LanguageMenu isLanguageMenuOpen={isLanguageMenuOpen} setIsLanguageMenuOpen={setIsLanguageMenuOpen} />
                </div>
              }
            </AnimatePresence>

            <ThemeToggle className='h-8 w-8' />

            <motion.button
              type='button'
              className='cursor-pointer border-2 p-2 px-4 rounded-full bg-[--primary] text-white text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--hovered]'
              whileHover={{ backgroundColor:'var(--hovered)' }}
              transition={{ duration:0.3, ease:'easeInOut' }}
              onClick={click}
            >
                {t('button')}
            </motion.button>
          </div>
      </div>
          <AnimatePresence>
            {
              isServiceMenuOpen
              &&
              <div id='service-menu' ref={serviceMenuRef}>
                <ServiceMenu data={data} setIsServiceMenuOpen={setIsServiceMenuOpen} locale={locale} />
              </div>
            }

          </AnimatePresence>
    </>

  )
}
