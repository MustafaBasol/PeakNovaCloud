'use client'
import { memo } from "react";
import InfoCard from './InfoCard';
import { motion } from 'framer-motion';

export default memo(function InfoCards({ data }) {

  const variants = {
    initial:{ opacity:0, x:100 },
    show:{
      opacity:1,
      x:0,
      transition: {        
        ease:'easeInOut',
        duration:0.5,        
        staggerChildren:0.5
      }
    } 
  }

  return (
    <motion.div 
      className='grid grid-cols-2 gap-2 p-2 md:p-8 h-full md:h-5/6 py-16 md:py-0 px-0 sm:px-8 md:px-2'      
      variants={variants}
      initial='initial'   
      whileInView='show'
      viewport={{ once:true }}      
    >
      {
        data.cards.map((card, index) => {
          return(
            <InfoCard key={index} Icon={card.Icon} title={card.title} desc={card.description} color={card.color}/>
          )
        })
      }        
    </motion.div>
  )
})
