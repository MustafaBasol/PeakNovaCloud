'use client'
import { motion, AnimatePresence } from 'framer-motion'
import IconRenderer from '../IconRenderer';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ServiceMenu from './ServiceMenu';
import { useTranslations } from 'next-intl';
import ScrollLink from '../ScrollLink';
import LanguageMenu from './LanguageMenu';

export default function ScreenSizeHeader({ data, locale }) {

  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  
  const pathname = usePathname()
  
  const t = useTranslations("Header")

  const nav = (path) => {       
    const contact = document.getElementById(`${path}-contact`)
    contact.scrollIntoView({ behavior:'smooth' })
    return 
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
              <motion.div 
                  className='flex items-center cursor-pointer'
                  onHoverStart={()=>setIsServiceMenuOpen(true)}
                  onHoverEnd={()=>setIsServiceMenuOpen(false)}
                  onClick={()=>setIsServiceMenuOpen(!isServiceMenuOpen)}               
              >
                  <motion.h6 className='text-base'>{t('service')}</motion.h6>
                  <IconRenderer className='w-4 h-4' iconName='MdOutlineExpandMore' />                        
              </motion.div>              
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
                  Blog
                </h6> 
              </ScrollLink>                  
              </div>                                                              
          </div>
          <div className='flex items-center gap-2 relative h-24 mr-4'>
            <motion.div 
              className='flex items-center cursor-pointer h-24'
              onHoverStart={()=>setIsLanguageMenuOpen(true)}
              onHoverEnd={()=>setIsLanguageMenuOpen(false)}  
               onClick={()=>setIsLanguageMenuOpen(!isLanguageMenuOpen)}    
            > 
              <IconRenderer className='w-8 h-8' iconName='RiGlobalLine' />             
            </motion.div>  
            <AnimatePresence>
              {
                isLanguageMenuOpen
                &&              
                <LanguageMenu isLanguageMenuOpen={isLanguageMenuOpen} setIsLanguageMenuOpen={setIsLanguageMenuOpen} />
              }                
            </AnimatePresence>
                       
            <motion.div
              className='cursor-pointer border-2 p-2 px-4 rounded-full bg-[--primary] text-white text-base'
              whileHover={{ backgroundColor:'var(--text)' }}
              transition={{ duration:0.3, ease:'easeInOut' }}
              onClick={click}
            >              
                {t('button')}                       
            </motion.div>                             
          </div>
      </div>       
          <AnimatePresence>
            {
              isServiceMenuOpen
              &&
              <ServiceMenu data={data} setIsServiceMenuOpen={setIsServiceMenuOpen} locale={locale} /> 
            }        
                            
          </AnimatePresence>   
    </>

  )
}
