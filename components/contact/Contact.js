'use client'
import React, { useState } from 'react'
import ContactForm from './Form'
import FormText from './FormText'
import { motion } from 'framer-motion'
import Toaster from '../Toast'
import { rightToLeftVariants, leftToRightVariants } from '@/libs/variants'

export default function Contact({ id, color, pageData }) {
  
  const [isOpen, setIsOpen] = useState(false)
  const data = pageData.data.find((item)=>item.section.includes('contact'))
  
  return (
    <div id={id} className='h-max md:h-screen grid grid-cols-1 md:grid-cols-2 p-8 gap-2 md:min-h-max'>
        <motion.div 
          className=' flex items-center justify-center my-auto
          md:[--x-from:100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
          '
          variants={rightToLeftVariants}
          initial='initial'
          whileInView='onView'
          viewport={{ once:true }}
          transition={{ duration:0.6, ease:'easeInOut' }}

        >
            <FormText data={data} />
        </motion.div>
        <motion.div 
          className='my-auto md:[--x-from:-100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]'
          variants={leftToRightVariants}
          initial='initial'
          whileInView='onView'
          viewport={{ once:true }} 
          transition={{ duration:0.6, ease:'easeInOut', delay:0.2 }}       
        >
            <ContactForm isOpen={isOpen} setIsOpen={setIsOpen} color={color} />
        </motion.div>
        <Toaster isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
