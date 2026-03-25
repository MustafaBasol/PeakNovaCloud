'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { belowToTopVariants } from '@/libs/variants'
import { useTranslations } from 'next-intl'
import ScrollLink from '../ScrollLink'
import { getEntityId } from '@/libs/entityId'

export default function ProjectItem({ item, locale }) {
  
  const t = useTranslations('Project')
  return (
    <motion.div
        className='p-2 sm:p-4 md:p-8 flex flex-col gap-2 text-center justify-center rounded-lg shadow-xl z-10 w-5/6 mx-auto bg-[--light] text-[--text]
        md:[--y-from:100] md:[--y-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        '
        variants={belowToTopVariants}
        initial='initial'
        whileInView='onView'
        transition={{ duration:0.4, ease:'easeInOut' }}
        viewport={{ once:true }}
    >
        <Image 
            src={`/${item.image}`}    
            width={320}
            height={180}   
            className='mx-auto px-4'     
            alt={item.name} 
        />
        <h5 className='text-xl md:text-2xl '>{item.name}</h5>
        <h6 className='text-base md:text-lg font-bold '>{item.title}</h6>
        <p className='line-clamp-3 w-4/6 mx-auto'>{item.description}</p>
        <ScrollLink href={`/${locale}/projects/${getEntityId(item)}`} className='text-black underline'>{t('more')}</ScrollLink>
    </motion.div>
  )
}
