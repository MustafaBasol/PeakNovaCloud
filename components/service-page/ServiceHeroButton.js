'use client'
import React from 'react'
import { motion } from 'framer-motion'


export default function ServiceHeroButton({ data, color }) {
  return (
        <motion.button     
            style={{ backgroundColor:`var(--${color})`}}        
            className='w-max md:w-2/6 p-2 rounded-lg text-white mx-auto md:mx-0 border-2 outline-none'
            whileHover={{ backgroundColor:`var(--text)` }}
            onClick={()=>{
                let contact = document.getElementById('service-contact')
                contact.scrollIntoView({ behavior:'smooth' })
            }}
        >{data.buttonText} 
        </motion.button>        
  )
}
