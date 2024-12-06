'use client'
import React from 'react'
import SingleBlog from './SingleBlog'
import { useTranslations } from 'next-intl'

export default function BlogHolder({ blogData, locale }) {
  
    const data = blogData.slice(0, 3)
    const t = useTranslations('BlogHolder')
    
    return (
    <div className='h-max md:h-screen flex flex-col gap-8'>
        <h3 className='text-center text-3xl sm:text-4xl md:text-5xl p-4 text-gradient'>{t('title')}</h3>
        <div className='flex md:flex-row flex-col gap-16 w-5/6 mx-auto'>
            {
                data.map((blog) => {
                    return(
                        <SingleBlog blog={blog} key={blog._id} t={t} locale={locale} />
                    )
                })
            }
        </div>             
    </div>

  )
}
