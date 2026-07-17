import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutActionImage({ variants, classes, data }) {
  return (
    <motion.div 
        className={`relative h-40 sm:h-48 md:h-full ${classes}`}
        viewport={{ once:true }}
        variants={variants}
        initial='initial'
        whileInView='onView'
        transition={{
            duration:0.8,
            ease:'easeInOut'
        }}            
    >
        <Image
            src={`/${data.image}`}
            fill
            sizes='(max-width: 768px) 45vw, 20vw'
            alt={data.title}
            unoptimized
            className='object-contain rounded-lg'
        />
    </motion.div>
  )
}
