'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ScrollLink from '../ScrollLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md' 

export default function SmallLanguageMenu({ setIsSmallLanguageMenuOpen }) {
    
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
        className='flex flex-col items-start justify-start text-[--text] w-full h-full gap-8 p-2 left-0 right-0 bottom-0 top-20 overflow-hidden bg-[--light] fixed zk z-100 origin-left'
        initial={{ scaleX:0 }}
        animate={{ scaleX:1 }}
        exit={{ scaleX:0 }}
        transition={{
            duration:0.5, ease:'easeInOut'
        }}         
        >
            <motion.div 
                className='flex items-center cursor-pointer w-full p-2'
                whileHover={{
                translateY:-8
                }}
                onClick={()=>setIsSmallLanguageMenuOpen(false)}
            >
                <MdOutlineKeyboardArrowLeft className='w-12 h-12 ' />  
                <h6>{t('back')}</h6>
            </motion.div>          
            {
                data.map((item, index) => {
                    return(
                        <motion.div
                            className='w-full px-4 py-2'
                            whileHover={{
                                backgroundColor:'var(--light)'
                            }}    
                            transition={{ duration:0.5, ease:'easeInOut' }}                
                        >
                            <ScrollLink 
                                className='flex gap-2 cursor-pointer' 
                                key={index}
                                href={`/${item.lang}`}
                            >
                                <Image 
                                    width={40}
                                    height={40}
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
