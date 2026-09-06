'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ScrollLink from '../ScrollLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import IconRenderer from '../IconRenderer'
import { usePathname } from '@/i18n/routing'

export default function SmallLanguageMenu({ setIsSmallLanguageMenuOpen }) {

    const t = useTranslations('LangMenu')
    const pathname = usePathname()
    const restOfPath = pathname === '/' ? '' : pathname

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
            duration:0.5, ease: [0.16, 1, 0.3, 1]
        }}         
        >
            <motion.button
                type='button'
                className='flex items-center cursor-pointer w-full p-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--primary] focus-visible:outline-offset-2 rounded'
                whileHover={{
                translateY:-8
                }}
                onClick={()=>setIsSmallLanguageMenuOpen(false)}
            >
                <IconRenderer iconName='MdOutlineKeyboardArrowLeft' className='w-12 h-12 ' />
                <h6>{t('back')}</h6>
            </motion.button>

            {
                data.map((item, index) => {
                    return(
                        <motion.div
                            key={index}
                            className='w-full px-4 py-2'
                            whileHover={{
                                backgroundColor:'var(--light)'
                            }}    
                            transition={{ duration:0.5, ease: [0.16, 1, 0.3, 1] }}                
                        >
                            <ScrollLink
                                className='flex gap-2 cursor-pointer'
                                key={index}
                                href={`/${item.lang}${restOfPath}`}
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
