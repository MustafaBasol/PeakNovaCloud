'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ReachUsTextButton from './ReachUsTextButton'
import { rightToLeftVariants } from '@/libs/variants'

export default function ReachUsText({ data, color }) {
  return (
    <motion.div 
        className='flex flex-col text-center md:text-start justify-center p-4 gap-2 md:gap-8
        md:[--x-from:100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        '
        variants={rightToLeftVariants}
        initial='initial'
        whileInView='onView'
        transition={{ duration:0.4 }} 
        viewport={{ once:true }}               
    >
        <h2 
          className='text-3xl md:text-3xl lg:text-4xl text-bold' 
          style={{ color:`var(--${color})` }}
        > {data.title}</h2>
        <p className='text-base md:text-lg lg:text-xl ' >{data.description}</p> 
        <ReachUsTextButton data={data} color={color} />
    </motion.div>
  )
}
