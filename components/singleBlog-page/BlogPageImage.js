import React from 'react'
import Image from 'next/image'
import { publicSrc } from '@/libs/imageSrc'

export default function BlogPageImage({ blogData }) {
  const cover = publicSrc(blogData.coverImage)
  return (
        <div className='p-4 w-full md:w-11/12 mx-auto pt-16 flex flex-col gap-4'>
            <h1 
                className='text-start text-3xl sm:text-4xl md:text-5xl p-4 text-gradient'
            >
                {blogData.title}
            </h1>
            {cover ? (
            <div className='w-full'>
                <Image 
                    className='rounded-lg'
                    layout='responsive'
                    alt={blogData.title}
                    src={cover}
                    width={16}
                    height={9}
                />                
            </div>
            ) : null}
        </div>
  )
}
