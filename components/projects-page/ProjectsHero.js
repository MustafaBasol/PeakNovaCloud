import React from 'react'
import Image from 'next/image'

export default function ProjectsHero({ pageData }) {

  const data = pageData.data.find((item)=>item.section == 'project-hero')

  if (!data) {
    return null
  }

  return (
    <section className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center py-16 md:py-20">
      <Image
        src={`/${data.image}`}
        alt=""
        fill
        priority={true}
        unoptimized
        className="z-0 object-center object-cover"
      />
      <div className='relative z-10 w-full p-8'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-gradient p-2 font-bold'>{data.title}</h1>
        <p className='w-full md:w-4/6 text-center mx-auto text-base md:text-lg lg:text-xl leading-loose'>{data.description}</p>
      </div>
    </section>
  )
}
