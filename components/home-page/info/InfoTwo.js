'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { rightToLeftVariants, leftToRightVariants } from '@/libs/variants'

export default function InfoTwo({ pageData }) {

  const data = pageData.data.find((item)=>item.section == 'home-info1')

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-max py-32 md:py-0 md:h-[85vh] gap-8 md:w-5/6 mx-auto'>
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
                width={600}
                alt={data.title}
                className='my-auto rounded-lg shadow-lg'
            />  
        </motion.div>   
        <motion.div 
            className='flex flex-col items-start justify-center gap-2
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
            <h3 className='text-2xl sm:text-3xl  lg:text-4xl text-center mx-auto md:mx-0 text-[--primary]'>{data.title}</h3>        
            <p className={`w-full md:w-full lg:w-5/6 text-start px-4 md:px-0 md:text-start text-xs sm:text-base md:text-sm lg:text-sm xl:text-base leading-loose top-24`}>
                {data.description}
            </p>
        </motion.div>             
    </div>  
  )
}
