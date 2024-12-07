import React from 'react'
import HeroImages from './HeroImages'
import HeroText from './HeroText'

export default function Hero({ pageData }) {

  const data = pageData.data.find((item)=>item.section == 'home-hero')
  
  return (
    <section id='home-home' className="h-max md:h-screen md:min-h-max" 
    >
      <div className='flex flex-col-reverse md:grid md:grid-cols-2 h-max lg:h-5/6 sm:px-16 pb-4'>
        <HeroText data={data} />
        <HeroImages data={data} />
      </div>        
    </section>
  )
}
