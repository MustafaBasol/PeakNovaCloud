'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ReachMeButton({ data }) {
  return (
    <motion.button 
        className='text-xs md:text-base p-4 rounded-lg text-center md:text-start w-max cursor-pointer bg-[--primary] shadow-lg outline-none ml-4'
        whileHover={{
            color:'var(--light)',
            backgroundColor:'var(--text)'                    
        }}
        onClick={()=> {
            const contact = document.getElementById('home-contact')
            contact.scrollIntoView({ behavior:'smooth' })
        }}            
    >   {data.buttonText}
    </motion.button> 
  )
}
