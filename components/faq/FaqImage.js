'use client'
import React from 'react'
import { motion } from 'framer-motion'
import DynamicSvgComponent from '../DynamicSVGComponent'

export default function FaqImage({ data, color }) {
    
  return (
    <motion.div 
      className='flex w-5/6 sm:w-full md:h-screen mx-auto' 
      style={{ color:`var(--${color})`}}
      initial={{ x:-200, opacity:0 }}
      whileInView={{ x:0, opacity:1 }}
      transition={{ duration:0.5, ease:'easeInOut' }}
      viewport={{ once:true }}
    >
        <DynamicSvgComponent 
            iconName='questions.svg'
            color={`var(--${color})`}                                  
        />
    </motion.div>
  )
}
