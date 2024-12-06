import React from 'react'

export default function ServiceHeroText({ data }) {
  return (
    <>
        <h1 className='text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-center md:text-start font-semibold '>{data.title}</h1>
        <p className='text-sm md:text-base text-center md:text-base md:text-start'>{data.description}</p>        
    </>

  )
}
