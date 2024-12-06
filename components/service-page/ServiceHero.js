'use client'
import React from 'react'
import ServiceHeroButton from './ServiceHeroButton'
import ServiceHeroText from './ServiceHeroText'
import DynamicSvgComponent from '../DynamicSVGComponent'

export default function ServiceHero({ serviceData, color }) {
  
  const data = serviceData.data.find((item)=>item.section == 'hero')

  return (
        <div             
            className="grid grid-cols-1 md:grid-cols-2 h-max md:h-screen px-2 gap-4 md:gap-0 px-2 xl:px-32 pt-4"
        >
            <div className="flex flex-col gap-8 items-start md:items-start justify-center px-8 text-[--text]">                
              <ServiceHeroText data={data} />
              <ServiceHeroButton data={data} color={color} />
            </div>
            <div style={{ color:`var(--${color}`}} className="mx-auto my-auto w-full">
              <DynamicSvgComponent 
                  iconName={data.image}
                  color={color}             
              />
            </div>            
      </div>
  )
}
