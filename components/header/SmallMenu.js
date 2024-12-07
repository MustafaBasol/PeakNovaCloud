'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowDropRightLine } from "react-icons/ri";
import SmallNavMenu from './SmallNavMenu';
import SmallScreenServiceMenu from './SmallScreenServiceMenu';
import SmallLanguageMenu from './SmallLanguageMenu';
import { useTranslations } from 'next-intl';

export default function SmallMenu({ isMenuOpen, setIsMenuOpen, data, locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSmallLanguageMenu, setIsSmallLanguageMenuOpen] = useState(false)

  const [navs, setNavs] = useState([
    { title:'service', Icon: RiArrowDropRightLine },
    { title:'project', Icon:'' },
    { title:'about', Icon:'' },
    { title:'blog', Icon:'' },
    { title:'button', Icon:'' },
    { title:'language', Icon: RiArrowDropRightLine}
  ])

  const t = useTranslations('SmallHeader')

  return (
      <motion.div 
          className='overflow-y-auto flex flex-col items-start justify-start gap-2 px-8 py-4 text-3xl md:text-4xl text-black w-full h-full left-0 right-0 bottom-0 top-20 overflow-hidden	bg-[--light] fixed zk z-50 origin-right' 
          initial={{ scaleX:0 }}
          animate={{ scaleX:1 }}
          exit={{ scaleX:0 }}
          transition={{
            duration:0.5, ease:'easeInOut'
          }}
      >      
        {
          navs.map((nav, i) => {
            return(
              <SmallNavMenu 
                title={t(nav.title)} 
                Icon={nav.Icon} 
                key={i} 
                setIsOpen={setIsOpen} 
                setIsMenuOpen={setIsMenuOpen} 
                isMenuOpen={isMenuOpen}  
                index={i}  
                locale={locale} 
                setIsSmallLanguageMenuOpen={setIsSmallLanguageMenuOpen}             
              />
            )
          })
        }   
        <AnimatePresence>
          {
            isOpen
            &&
            <SmallScreenServiceMenu 
              data={data} 
              setIsOpen={setIsOpen} 
              setIsMenuOpen={setIsMenuOpen} 
              isMenuOpen={isMenuOpen} 
              locale={locale}
            />
          }  
        {
          isSmallLanguageMenu
          &&
          <SmallLanguageMenu t={t} locale={locale} setIsSmallLanguageMenuOpen={setIsSmallLanguageMenuOpen} />
        }                     
        </AnimatePresence>             
      </motion.div>      
  )
}
