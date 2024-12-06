import React from 'react'
import { motion } from 'framer-motion'
import { belowToTopVariants } from '@/libs/variants'

export default function AboutTeamText({ data }) {
  return (
    <motion.div 
        className='flex flex-col p-2 md:p-0
        md:[--y-from:100] md:[--y-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        '
        variants={belowToTopVariants}
        viewport={{ once:true }}
        initial='initial'
        whileInView='onView'
        transition={{
            duration:0.6,
            ease:'easeInOut'
        }}
    >
        <h2 className='text-xl md:text-2xl'>{data.title}</h2>
        <p className='text-xs md:text-base'>{data.description}</p>        
    </motion.div>
  )
}
