'use client'
import React from 'react'
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { useTranslations } from 'next-intl';

export default function Services({ services, locale }) {

    const t = useTranslations('OurServices')

  return (
    <div className='h-max pt-8 mb-16' id='home-service'>
        <motion.h3 
            className='text-center text-3xl sm:text-4xl md:text-5xl p-4 text-[--primary]'
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.1, ease:'easeOut' }}            
        >   {t('services')}
        </motion.h3>    
        <div             
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 gap-y-32 mt-16 px-8 md:px-2'
        >
            {
                services.map((service, i) => {
                    return (
                        <ServiceCard 
                            key={i} 
                            name={service.name} 
                            Icon={service.Icon} 
                            desc={service.description} 
                            color={service.color}  
                            locale={locale}                  
                        />
                    )
                })
            }            
        </div>
    </div>
  )
}
