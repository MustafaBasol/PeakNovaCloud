'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { leftToRightVariants } from '@/libs/variants'
import InfoCardInfoText from './InfoCardInfoText'

export default function InfoCardInfo({ data }) {
  return (
    <motion.div 
        className='hidden md:flex flex-col items-start w-5/6 mx-auto justify-center gap-4
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
        <InfoCardInfoText data={data} />
        <motion.button 
            className='mx-auto md:mx-0 bg-[--primary] text-xs sm:text-base py-2 px-4 sm:px-8 rounded-full text-white shadow w-max whitespace-nowrap	'
            whileHover={{
                backgroundColor:'var(--hovered)'
            }}
            onClick={() => {
                let contact = document.getElementById('home-contact')
                contact.scrollIntoView({ behavior:'smooth' })
            }}
        >{data.buttonText}</motion.button>
    </motion.div>
  )
}
