'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ReachMeButton from './ReachMeButton'
import { belowToTopVariants } from '../../libs/variants'
import DynamicSvgComponent from '../DynamicSVGComponent'

export default function ReachMe({ pageData }) {

    const data = pageData.data.find((item)=>item.section == 'home-action')
   
    return (
    <motion.div
        className='grid grid-cols-1 md:grid-cols-3 gap-2 w-full rounded-lg md:gap-8 h-max p-4 text-white mx-auto bg-[--light] shadow-lg
        md:[--y-from:100] md:[--y-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        '        
        variants={belowToTopVariants}
        initial='initial'
        whileInView='onView'
        viewport={{ once:true }}
        transition={{ duration:0.4, ease:'easeInOut', delay:0.1 }}
        
    >
        <div className='h-48 sm:h-56 md:h-64 lg:h-auto my-0 md:my-auto lg:my-0 mx-auto'>
            <DynamicSvgComponent 
                iconName={data.image}
                color={data.color}
            />
        </div>    
        <div className='flex flex-col justify-center items-center col-span-2 gap-4 md:gap-12'>            
            <h6 className='text-2xl lg:text-4xl p-0 md:p-4 text-center text-[--primary]'>{data.title}</h6>        
            <ReachMeButton data={data} />
        </div>

    </motion.div>
  )
}
