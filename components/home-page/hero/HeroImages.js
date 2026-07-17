import React from 'react'
import Image from 'next/image'

export default  function HeroImages({ data }) {
  
  return (
    <div className='relative w-full h-72 sm:h-80 md:h-[380px] lg:h-[440px] xl:h-[500px]'>
      <Image
        className='pt-4 md:pt-8'
        src={`/${data.image}`}
        fill
        sizes='(max-width: 768px) 90vw, 45vw'
        style={{ objectFit:'contain' }}
        alt={data.title}
        unoptimized
        priority
      />
    </div>
  )
}
