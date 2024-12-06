import React from 'react'
import IconRenderer from '../IconRenderer'

export default function WhyServicesCard({ item, color }) {
  return (
    <div                            
        className='flex flex-col gap-4 w-full service-card mx-auto border-2 border-light shadow-lg rounded-lg p-2 bg-white'                            
        style={{ color:`var(--${color})`}}      
                        
    >
        <IconRenderer iconName={item.Icon}  className='w-8 h-8 lg:w-12 lg:h-12 mx-auto' />
        <h5 className='text-lg xl:text-2xl text-[--text] text-bold'>{item.title}</h5>
        <p className='text-xs md:text-sm text-[--text]'>{item.description}</p>
    </div>
  )
}
