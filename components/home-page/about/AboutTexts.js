'use client'
import { motion } from 'framer-motion'
import React from 'react'
import { belowToTopVariants } from '@/libs/variants'

export default function AboutTexts({ item }) {
      
  return (
    <motion.div         
        className='flex flex-col gap-4 h-max md:h-[65vh] leading-loose
        md:[--x-from:100] md:[--y-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        '
        variants={belowToTopVariants}
        initial='initial'
        whileInView='onView'
        transition={{ duration:0.5 }}
        viewport={{ once:true }}
    >
        <h4 className='text-3xl sm:text-4xl md:text-5xl text-start md:text-center text-gradient p-2'>{item.title}</h4>
        <p className='w-full md:w-4/6 text-start md:text-center mx-auto text-xs sm:text-base md:text-base xl:text-xl '>{item.description}</p>
    </motion.div> 
  )
}
