import React from 'react'

export default function InfoCardInfoText({ data }) {
  return (
    <>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl md:text-start text-center mx-auto md:mx-0 text-[--primary]'>{data.title}</h2>                          
        <p 
            className={`w-full md:w-full lg:w-5/6 text-center md:text-start text-xs sm:text-base md:text-sm lg:text-base lg:text-base xl:text-base leading-loose`}
        >
          {data.description}
        </p>
    </>
  )
}
