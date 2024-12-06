'use client'
import FaqImage from './FaqImage';
import FaqQuestion from './FaqQuestion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Faq({ data, color }) {

   const [activeIndex, setActiveIndex] = useState(null) 

   const t = useTranslations('Faq')
   
  return (
    <div className='flex h-max w-full md:w-11/12 lg:w-5/6 mx-auto justify-center'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 '>
            <FaqImage data={data} color={color} />
            <div className='flex flex-col items-center gap-8 w-full p-4 lg:col-span-2 h-max overflow-hidden'>
                <h1 style={{ color: `var(--${color})`}} className='text-3xl md:text-2xl lg:text-5xl p-4'>{t('faq')}</h1>                
                    {
                        data.data.map((item, i) => {
                                return(
                                    <FaqQuestion key={i} item={item} i={i} color={color} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                                )
                        })
                    }                                     
            </div>
        </div>   
    </div>
  )
}
