'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import IconRenderer from '../IconRenderer'

export default function SmallNavMenu({ title, Icon, setIsOpen, setIsMenuOpen, index, locale, setIsSmallLanguageMenuOpen }) {

  const router = useRouter()
  const pathname = usePathname()

  const nav = (path) => {
    setIsMenuOpen(false)
    const contact = document.getElementById(`${path}-contact`)
    if (contact) {
      contact.scrollIntoView({ behavior:'smooth' })
    } else {
      router.push(`/${locale}#home-contact`)
    }
  }

  const click = () => {
    if(index === 0) {
      setIsOpen(true)
      return
    }
    if(index === 1) {
        router.push(`/${locale}/projects`)
        setIsMenuOpen(false)
    }
    if(index === 2) {
        router.push(`/${locale}/about`);
        setIsMenuOpen(false)
    }
    if(index === 3) {
        router.push(`/${locale}/blogs`);
        setIsMenuOpen(false)
    }
    if(index === 4) {
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
        else {
          nav('home')
          return
        }
    }
    if(index == 5) {
      setIsSmallLanguageMenuOpen(true)
      return
    }
  }
  return (
    <motion.button
        type='button'
        className='mt-4 flex items-center justify-between w-full p-2 cursor-pointer h-[70px] rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--primary] focus-visible:outline-offset-2'
        whileHover={{ translateY:-10 }}
        onClick={click}
    >
        <h6>{title}</h6>
        {
            Icon
            &&
            <IconRenderer iconName={Icon} className='w-[52px] h-[52px]' />
        }
    </motion.button>
  )
}
