'use client'
import React from 'react'
import { motion } from 'framer-motion'
import IconRenderer from '../../IconRenderer'
import { useRouter } from 'next/navigation'

export default function Card({ Icon, color, name }) {
    
  const router = useRouter()
  let href = (name.split(' ').join('-')).toLowerCase()
  
  return (
    <motion.div 
      className='flex flex-col items-center justify-center p-4 cursor-pointer'
      style={{ color: `var(--${color})`}}
      whileHover={{
        scale:1.1
      }}
      onClick={()=> router.push(`/services/${href}`)}
    >
      <IconRenderer iconName={Icon} className='w-8 h-8' />
      <h2>{name}</h2>
    </motion.div>
  ) 
}
