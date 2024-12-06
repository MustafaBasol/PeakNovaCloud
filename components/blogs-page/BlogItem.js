'use client'
import Image from 'next/image'
import React from 'react'
import ScrollLink from '../ScrollLink'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function BlogItem({ blog, locale }) {

    const t = useTranslations('BlogHolder')

  return (
    <motion.div
      initial={{ y:100 }}
      whileInView={{ y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.4, ease:'easeInOut', delay:0.1 }}
    >
        <ScrollLink 
          href={`/${locale}/blogs/${blog.slug}`} 
          className='w-full flex flex-col gap-4 shadow-lg bg-white hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg'
        >
            <Image 
                src={blog.coverImage}
                alt={blog.title}
                layout='responsive'
                width={16}
                height={9}
                className='rounded-lg shadow-lg'
            />  
            <div className='w-full flex flex-col gap-4 p-2 '>
              <h4 className='text-base font-bold text-[--primary]'>{blog.title}</h4>
              <h5 className='text-sm'>{blog.summary}</h5>
                   
            </div>    
        </ScrollLink>
    </motion.div>
  )
}
