'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollLink from '../ScrollLink'

export default function SingleBlog({ blog, t, locale }) {
  return (
    <motion.div 
      className='flex flex-col gap-4 w-full p-2 h-max'
      initial={{ y:100, opacity:0 }}
      whileInView={{ y:0, opacity:1 }}
      viewport={{ once:true }}
      transition={{ duration:0.4, delay:0.1, ease:'easeInOut' }}
    >
        <div className='relative h-80'>
            <Image 
                src={'/about.jpg'}
                fill
                alt={blog.title}
                className='object-cover rounded-lg'                   
            />            
        </div>
        <h4 className='text-base font-bold text-[--primary]'>{blog.title}</h4>
        <h5 className='text-sm'>{blog.summary}</h5>
        <ScrollLink href={`/${locale}/blogs/${blog.slug}`} className='underline cursor-pointer'>{t('readMore')}</ScrollLink>
    </motion.div>
  )
}
