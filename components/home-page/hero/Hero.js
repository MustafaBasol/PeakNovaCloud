import React from 'react'
import HeroImages from './HeroImages'
import HeroText from './HeroText'

export default function Hero({ pageData }) {

  const data = pageData.data.find((item)=>item.section == 'home-hero')

  if (!data) {
    return null
  }

  return (
    <section id='home-home' className="h-auto py-10 md:py-16 lg:py-20"
    >
      <div className='flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-8 h-auto sm:px-16'>
        <HeroText data={data} />
        <HeroImages data={data} />
      </div>
    </section>
  )
}
