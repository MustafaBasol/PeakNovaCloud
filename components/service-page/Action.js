'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ActionImage from './ActionImage'
import ActionText from './ActionText'

export default function Action({ color, serviceData }) {
  
  const data = serviceData.data.find((item)=>item.section == 'action')

  if (!data) {
    return null
  }

  return (
    <motion.div 
        className='grid grid-cols-3 h-auto py-8 md:py-12 w-full px-2 px-0 mx-auto rounded-xl shadow-lg md:items-center'
        style={{             
            background: `linear-gradient(90deg, var(--${color}) 0%, rgba(230,245,251,1) 100%)` 
        }}
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        transition={{ duration:0.5, ease:'easeInOut', delay:0.2 }}
        viewport={{ once:true }}
    >
        <ActionImage data={data} />
        <ActionText data={data} />
    </motion.div>
  )
}
