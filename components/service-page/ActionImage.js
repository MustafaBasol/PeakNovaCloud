import React from 'react'
import Image from 'next/image'

export default function ActionImage({ data }) {
  return (
        <div className='relative'>
            <Image  
                src={`/${data.image}`}
                fill               
                alt={data.title}
                className='object-contain md:object-cover rounded-lg'
            />            
        </div>
  )
}
