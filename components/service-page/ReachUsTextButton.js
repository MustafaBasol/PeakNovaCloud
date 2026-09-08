'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ReachUsTextButton({ data, color }) {
  return (
        <motion.button 
            style={{ backgroundColor:`var(--${color}`}}
            className='px-4 py-2 w-max rounded-lg text-white text-sm md:text-base mx-auto md:mx-0'
            whileHover={{ backgroundColor:'var(--hovered)' }}
            transition={{ duration:0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={()=>{
                let contact = document.getElementById('service-contact')
                contact?.scrollIntoView({ behavior:'smooth' })
            }}                    
        >
            {data.buttonText}
        </motion.button>
  )
}
