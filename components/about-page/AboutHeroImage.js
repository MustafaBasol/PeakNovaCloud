import React from 'react'
import Image from 'next/image'

export default function AboutHeroImage({ data }) {
  return (

    <div className='relative w-11/12 md:w-5/6 aspect-[30/13] mx-auto overflow-hidden md:translate-y-[-25%] rounded-lg shadow-lg'>
        <Image 
            src={`/${data.image}`}              
            alt={data.title}
            fill
            className='object-contain '
        />                     
    </div>
  )
}
