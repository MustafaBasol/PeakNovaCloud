'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import IconRenderer from '../IconRenderer'

export default function SmallNavMenu({ title, Icon, setIsOpen, setIsMenuOpen, isMenuOpen, index, locale, setIsSmallLanguageMenuOpen }) {

  const router = useRouter()
  const pathname = usePathname()

  const nav = (path) => {
    setIsMenuOpen(false)
    if(isMenuOpen) {
        document.body.style.overflowY = "scroll"
    } else{            
        document.body.style.overflowY = "hidden"
    }      
    const contact = document.getElementById(`${path}-contact`)
    contact.scrollIntoView({ behavior:'smooth' })
    return 
  }

  const click = () => {
    if(index === 0) {
      setIsOpen(true)
      return
    } 
    if(index === 1) {
        router.push(`/${locale}/projects`)
        setIsMenuOpen(false)
        if(isMenuOpen) {
            document.body.style.overflowY = "scroll"
        } else{            
            document.body.style.overflowY = "hidden"
        }    
    }
    if(index === 2) {
        router.push(`/${locale}/about`);
        setIsMenuOpen(false)
        if(isMenuOpen) {
            document.body.style.overflowY = "scroll"
        } else{            
            document.body.style.overflowY = "hidden"
        }        
    }
    if(index === 3) {
        router.push(`/${locale}/blogs`);
        setIsMenuOpen(false)
        if(isMenuOpen) {
            document.body.style.overflowY = "scroll"
        } else{            
            document.body.style.overflowY = "hidden"
        }        
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
    <motion.div
        className='mt-4 flex items-center justify-between w-full p-2 cursor-pointer h-[70px] rounded-lg'
        whileHover={{ translateY:-10 }}
        onClick={click}
    >
        <h6>{title}</h6>
        {
            Icon
            &&
            <IconRenderer iconName={Icon} className='w-[52px] h-[52px]' />
        }
    </motion.div>
  )
}
