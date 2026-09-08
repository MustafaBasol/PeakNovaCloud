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
      transition={{ duration:0.4, ease: [0.16, 1, 0.3, 1], delay:0.1 }}
    >
        <ScrollLink 
          href={`/${locale}/blogs/${blog.slug}`} 
          className='w-full flex flex-col gap-4 shadow-lg hover:shadow-2xl bg-white dark:bg-gray-800 hover:scale-[1.03] transition-all duration-300 ease-out rounded-lg'
        >
            <div className='relative w-full aspect-video overflow-hidden rounded-lg shadow-lg'>
                <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    sizes='(min-width: 768px) 50vw, 100vw'
                    className='object-cover'
                />
            </div>
            <div className='w-full flex flex-col gap-4 p-2 '>
              <h4 className='text-base font-bold text-[--primary]'>{blog.title}</h4>
              <h5 className='text-sm'>{blog.summary}</h5>
                   
            </div>    
        </ScrollLink>
    </motion.div>
  )
}
