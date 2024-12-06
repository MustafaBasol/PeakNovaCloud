'use client'
import React, { memo } from 'react'
import { motion } from 'framer-motion'
import AboutTeamItem from './AboutTeamItem'
import AboutTeamText from './AboutTeamText'
import { belowToTopVariants } from '@/libs/variants'

export default memo(function AboutTeam({ pageData }) {

    const data = pageData.data.find((item)=>item.section == 'about-team')

  return (
    <div className='flex gap-2 px-2 md:px-32'>
        <AboutTeamText data={data} />
        <motion.div 
            className='px-2 md:px-8 border-l-2 border-black flex flex-col gap-2
            md:[--y-from:100] md:[--y-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
            '
            variants={belowToTopVariants}
            viewport={{ once:true }}
            initial='initial'
            whileInView='onView'
            transition={{
                duration:0.5,
                delay:0.1,
                ease:'easeInOut'
            }}
        >
            {
                data.cards.map((item, index) => {
                    return(
                        <AboutTeamItem item={item} key={index} />
                    )
                })
            }
        </motion.div>
    </div>
  )
})
