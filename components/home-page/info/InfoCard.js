import React from 'react'
import { motion } from 'framer-motion'
import IconRenderer from '@/components/IconRenderer'

export default function InfoCard({ Icon, title, desc, color}) {

  const variants = {
    initial:{ opacity:0, x:100 },
    show:{ opacity:1, x:0 }
  }

  return (
    <motion.div 
      style={{ color:`var(--${color})` }}
      className='flex flex-col justify-center shadow-2xl p-2 px-4 md:px-8 gap-2 rounded-2xl w-full sm:w-5/6 lg:w-5/6 info-card h-full'  
      variants={variants}
    >
        <IconRenderer iconName={Icon} className={`w-8 h-8 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px]`} />
        <h6 className='text-sm text-[--primary] font-bold'>{title}</h6>
        <p className='text-xs text-[--text]'>{desc}</p>
    </motion.div>
  )
}
