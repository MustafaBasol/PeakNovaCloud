'use client'
import React from 'react'
import AboutActionImage from './AboutActionImage'
import AboutActionText from './AboutActionText'
import { memo } from 'react'
import { leftToRightVariants, rightToLeftVariants } from '@/libs/variants'

export default memo(function AboutAction({ pageData }) {

    const data = pageData.data.find((item)=>item.section == 'about-action')

  return (
    <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 h-max md:h-80 gap-2 px-2'>
        <AboutActionImage 
          variants={leftToRightVariants} 
          classes='md:[--x-from:-100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]'
          data={data}
        />
        <AboutActionText data={data} />
        <AboutActionImage
          classes='md:[--x-from:100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]'
          variants={rightToLeftVariants} 
          data={data}        
        />
    </div>
  )
})
