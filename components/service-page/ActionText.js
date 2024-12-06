'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ActionText({ data }) {
  return (
        <div className='col-span-2 flex flex-col items-center justify-center p-4 gap-4 md:gap-8'>
            <h2 className='text-xl md:text-5xl text-center font-semibold'>{data.title}</h2>
            <p className='text-xs md:text-base w-full md:w-5/6'>{data.description} </p>
            <motion.button 
                className='text-xs md:text-lg border-2 shadow-lg w-max py-2 px-4 rounded-lg'
                whileHover={{ backgroundColor:'var(--text)', color:'white'}}
                onClick={()=>{
                    let contact = document.getElementById('service-contact')
                    contact.scrollIntoView({ behavior:'smooth' })
                }}                 
            >{data.buttonText}</motion.button>
        </div>
  )
}
