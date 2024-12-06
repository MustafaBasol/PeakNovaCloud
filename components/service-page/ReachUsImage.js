import React from 'react'
import { motion } from 'framer-motion'
import { leftToRightVariants } from '@/libs/variants'
import DynamicSvgComponent from '../DynamicSVGComponent'

export default function ReachUsImage({ data, color }) {
  return (
    <motion.div 
        className='md:[--x-from:-100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]' 
        style={{ color:`var(--${color})` }}
        variants={leftToRightVariants}
        initial='initial'
        whileInView='onView'
        transition={{ duration:0.4 }}
        viewport={{ once:true }} 
    >
        <DynamicSvgComponent
            iconName={data.image}
            color={`var(--${color})`}
            
        />                
    </motion.div>
  )
}
