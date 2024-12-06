
import React from 'react'

export default function FormText({ data }) {
  
  return (
    <div className='mb-8 w-full'>
        <h2 className='text-3xl lg:text-5xl text-center py-4 text-[--text] text-gradient'>{data.title}</h2>
        <hr className='border-t-2 border-black py-2' />
        <div className='flex flex-wrap sm:justify-center justify-start md:justify-start'>
          <p className='text-center text-xs md:text-base'>{data.description}</p>      
        </div>  
    </div>
  )
}
