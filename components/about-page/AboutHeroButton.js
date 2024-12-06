'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function AboutHeroButton({ data }) {
  return (
    <motion.button 
        className='mt-6 bg-[--light] sm:text-base rounded-full text-[--text] shadow w-max h-max p-4 mx-auto whitespace-nowrap'
        whileHover={{
            backgroundColor:'var(--hovered)',
            color:'var(--light)'
        }}
        onClick={() => {
            let contact = document.getElementById('about-contact')
            contact.scrollIntoView({ behavior:'smooth' })
        }}
    >{data.buttonText}</motion.button>
  )
}
