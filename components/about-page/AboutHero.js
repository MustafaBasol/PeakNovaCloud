
import AboutHeroButton from './AboutHeroButton'
import AboutHeroImage from './AboutHeroImage'
import { memo } from 'react'

export default memo(function AboutHero({ pageData }) {
    
  const data = pageData.data.find((item)=>item.section == 'about-hero')

  return ( 
    <div className=' h-auto text-white'>
        <div id='about-hero' className='flex flex-col gap-2 md:h-[65vh] h-max bg-[--primary] pt-8 pb-8 md:pb-0'>
            <h1 className='text-2xl md:text-5xl text-center w-full md:w-4/6 mx-auto'>{data.title}</h1>
            <p className='text-sm w-5/6 md:w-1/2 mx-auto text-center'>{data.description}</p>
            <AboutHeroButton data={data} />
        </div>
        <div className='mt-8 md:mt-0'>
           <AboutHeroImage data={data} /> 
        </div>                        
    </div>
  )
})
