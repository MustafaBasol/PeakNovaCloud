import React from 'react'
import Image from 'next/image'

export default function ActionImage({ data }) {
  return (
        <div className='relative h-40 sm:h-48 md:h-full min-h-[160px]'>
            <Image
                src={`/${data.image}`}
                fill
                sizes='(max-width: 768px) 30vw, 15vw'
                alt={data.title}
                unoptimized
                className='object-contain rounded-lg'
            />
        </div>
  )
}
