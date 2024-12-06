import React, { memo } from 'react'
import IconRenderer from '../IconRenderer';
import { belowToTopVariants } from '@/libs/variants';
import { motion } from 'framer-motion';
import SchemaItem from './SchemaItem';

export default memo(function Schema({ pageData }) {

    const data = pageData.data.find((item)=>item.section == 'project-step')

    
  return (
    <div className='px-4 md:px-16 w-5/6 sm:w-11/12 md:w-5/6 mx-auto py-16 flex flex-col gap-8 h-max md:h-screen'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl text-center text-gradient p-4 font-semibold'>{data.title}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-16'>
            {
                data.cards.map((item, index) => {
                    return (
                        <SchemaItem item={item} index={index} key={index} />
                    )
                })
            }     
        </div>        
    </div>
  )
})
