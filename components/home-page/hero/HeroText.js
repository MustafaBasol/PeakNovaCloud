import React from 'react'
import HeroButton from './HeroButton'

export default function HeroText({ data }) {
  return (
    <div className='w-full h-max text-black flex flex-col gap-4 justify-center md:pl-8 xl:pl-16 m-auto'>        
        <h1 className='text-center text-3xl  sm:text-4xl xl:text-5xl mt-4 md:text-left text-gradient py-2 font-semibold' >{data.title}</h1>
        <p className='mx-auto md:mx-0 text-center md:text-start text-sm sm:text-base w-5/6 md:text-left leading-relaxed	'>
        {data.description}
        </p>        
        <HeroButton data={data} />
    </div>
  )
}
