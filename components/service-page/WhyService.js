'use client'
import { motion} from "framer-motion";
import WhyServicesCard from "./WhyServicesCard";
import { belowToTopVariants } from "@/libs/variants";

export default function WhyService({ serviceData, color }) {
  
    const data = serviceData.data.find((item)=>item.section == 'why')

  return (
    <motion.div 
        className='h-max md:h-screen py-16 p-4 text-center px-2 lg:px-16 flex flex-col justify-center gap-4 lg:gap-8 w-full lg:w-11/12 xl:w-5/6 m-auto
        md:[--y-from:100] md:[--y-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        '
        variants={belowToTopVariants}
        initial='initial'
        whileInView='onView'
        viewport={{ once:true }}
        transition={{ duration:0.5, ease:'easeInOut' }}
    >
        <h1 
            style={{ color:`var(--${color})`}} 
            className='text-3xl sm:text-4xl md:text-5xl'
        >
            {data.title}
        </h1>
        <h6 className='text-lg sm:text-xl md:text-xl px-8 md:px-0'>{data.description}</h6>
        <div 
            className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-4 '                       
        >
            {
                data.cards.map((item, index) => {
                    return(
                        <WhyServicesCard key={index} item={item} color={color}  />
                    )
                })
            }            
        </div>

    </motion.div>
  )
}
