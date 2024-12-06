'use client'
import { FaCaretDown } from "react-icons/fa";
import { motion } from 'framer-motion';
import { rightToLeftVariants } from "@/libs/variants";

export default function FaqQuestion({ item, i, color, activeIndex, setActiveIndex }) {

    const clicked = (i) => {
        setActiveIndex(prev => prev === i ? null : i)
    }
    
  return (
    <motion.div 
        className='w-full md:w-5/6 h-auto border-b-2
        md:[--x-from:100] md:[--x-to:0] md:[--opacity-from:0%] md:[--opacity-to:100%]
        ' 
        style={{ borderColor:`var(--${color})`}}
        variants={rightToLeftVariants}
        initial='initial'
        whileInView='onView'
        transition={{ duration:0.5, ease:'easeInOut' }}
        viewport={{ once:true }}        
    >
            <div 
                className='flex flex-col cursor-pointer' 
                onClick={()=>clicked(i)}
                style={{ color:`var(--${color})`}}                                        
            >
                <div 
                    className='flex justify-between items-center p-2 md:p-4'
                >
                    <h5 className='text-sm lg:text-base text-[--text] font-semibold'>{item.question}</h5>
                    <motion.div
                        initial={{ transform:'rotate(0deg)'}}
                        animate={{ transform: activeIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        <FaCaretDown className={`w-8 h-8`} /> 
                    </motion.div>            
                </div>                  
                    {
                        (activeIndex === i) 
                        &&
                        <motion.div 
                            className='py-2 px-8 text-xs md:text-base text-start origin-top text-[--text]'
                            style={{  borderColor:`var(--${color})` }}
                            initial={{ scaleY:0 }}
                            animate={{ scaleY:1 }}                                                       
                            transition={{ duration:0.3, ease:'linear' }}
                        >
                            <p>{item.answer}</p>
                        </motion.div>                                                                     
                    }                                                                                                              
            </div>
        </motion.div>
  )
}
