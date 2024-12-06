import React from 'react'
import HeroImages from './HeroImages'
import HeroText from './HeroText'

export default function Hero({ pageData }) {

  const data = pageData.data.find((item)=>item.section == 'home-hero')
  
  return (
    <section id='home-home' className="h-auto md:h-screen" 
    >
      <div className='flex flex-col-reverse md:grid md:grid-cols-2 h-max md:h-5/6 sm:px-16 '>
        <HeroText data={data} />
        <HeroImages data={data} />
      </div>        
    </section>
  )
}
