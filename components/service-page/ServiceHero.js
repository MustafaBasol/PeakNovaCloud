'use client'
import React from 'react'
import ServiceHeroButton from './ServiceHeroButton'
import ServiceHeroText from './ServiceHeroText'
import DynamicSvgComponent from '../DynamicSVGComponent'

export default function ServiceHero({ serviceData, color }) {
  
  const data = serviceData.data.find((item)=>item.section == 'hero')

  if (!data) {
    return null
  }

  return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 h-auto md:items-center py-10 md:py-16 gap-8 md:gap-4 px-2 xl:px-32"
        >
            <div className="flex flex-col gap-8 items-start md:items-start justify-center px-8 text-[--text]">
              <ServiceHeroText data={data} />
              <ServiceHeroButton data={data} color={color} />
            </div>
            <div style={{ color:`var(--${color}`}} className="mx-auto my-auto w-full h-56 sm:h-64 md:h-80">
              <DynamicSvgComponent
                  iconName={data.image}
                  color={color}
              />
            </div>
      </div>
  )
}
