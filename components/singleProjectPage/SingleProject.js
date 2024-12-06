import React from 'react'
import Image from 'next/image'

export default function SingleProject({ projectData }) {

  return (
    <div
        className='p-8 flex flex-col bg-[--light] items-center gap-8'
    >
        <Image 
            src={`/${projectData.image}`}
            width={400}
            height={375}
            alt={projectData.name}
        />
        <h2 className='text-2xl text-center md:text-4xl text-gradient font-bold'>{projectData.name}</h2>
        <h3 className='text-xl text-center w-full md:w-4/6 md:text-3xl font-semibold'>{projectData.title}</h3>
        <p className='text-start w-full md:w-4/6 leading-loose text-sm md:text-lg whitespace-pre-line	'>{projectData.description}</p>
    </div>
  )
}
