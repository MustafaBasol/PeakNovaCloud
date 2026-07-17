'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { rightToLeftVariants, leftToRightVariants } from '@/libs/variants'

export default function InfoThree({ pageData }) {

    const data = pageData.data.find((item)=>item.section == 'home-info2')

  if (!data) {
    return null
  }

  return (
    <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-4 w-11/12 md:w-5/6 h-auto mx-auto py-16 md:py-20 md:items-center'>
        <motion.div 
            className='flex flex-col items-start justify-center gap-2 md:pl-2 lg:pl-8 xl:px-16
            md:[--x-from:100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
            '
            variants={rightToLeftVariants}
            initial='initial'
            whileInView='onView'
            viewport={{ once:true }}
            transition={{
                duration:0.5,
                ease:'easeInOut',
                delay:0.2
            }}                           
        >     
            <h3 className='text-2xl sm:text-3xl lg:text-4xl text-center mx-auto md:mx-0 text-[--primary]'>{data.title}</h3>        
            <p className={`w-full md:w-full lg:w-5/6 text-start md:text-start text-xs sm:text-base md:text-sm lg:text-sm xl:text-base leading-loose`}>
                {data.description}
            </p>
        </motion.div> 
        <motion.div 
            className='flex flex-col items-center gap-8 overflow w-5/6 md:w-4/6 md:w-full mx-auto
            md:[--x-from:-100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
            '
            variants={leftToRightVariants}
            initial='initial'
            whileInView='onView'
            viewport={{ once:true }}
            transition={{
                duration:0.5,
                ease:'easeInOut',
                delay:0.2
            }}               
        >
            <Image
                src={`/${data.image}`}
                height={600}
                width={800}
                alt={data.title}
                sizes='(max-width: 768px) 85vw, 40vw'
                unoptimized
                className='my-auto w-full h-auto max-w-md rounded-lg shadow-lg object-contain aspect-[4/3]'
            />
        </motion.div>                    
    </div>  
  )
}
