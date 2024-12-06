'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import ScrollLink from '../ScrollLink'

export default function LanguageMenu({ setIsLanguageMenuOpen }) {

    const t = useTranslations('LangMenu')

    const data = [
        {
            img:'UK',
            lang:'en',
        },
        {
            img:'FR',
            lang:'fr'
        },
        {
            img:'TR',
            lang:'tr'
        }                
    ]
  return (
    <motion.div 
        className="absolute -left-8 top-full origin-top w-max h-max  py-2 bg-white border rounded-b-lg shadow-sm z-50 flex flex-col gap-4"
        onHoverStart={()=>setIsLanguageMenuOpen(true)}
        onHoverEnd={()=>setIsLanguageMenuOpen(false)}     
        initial={{ scaleY:0 }}
        animate={{ scaleY:1 }}
        exit={{ scaleY:0 }}
        transition={{
            duration:0.5, ease:'easeInOut', delay:0.2
        }}             
    >
        {
            data.map((item, index) => {
                return(
                    <motion.div
                        className='w-full px-4 py-2'
                        whileHover={{
                            backgroundColor:'var(--light)'
                        }}    
                        transition={{ duration:0.5, ease:'easeInOut' }}    
                        key={index}            
                    >
                        <ScrollLink 
                            className='flex gap-2 cursor-pointer' 
                            key={index}
                            href={`/${item.lang}`}
                        >
                            <Image 
                                width={20}
                                height={20}
                                src={`/${item.img}.png`}
                                alt={item.lang}
                            />
                            <h6>{t(item.lang)}</h6>
                        </ScrollLink>                        
                    </motion.div>

                )
            })
        }
    </motion.div>
  )
}
