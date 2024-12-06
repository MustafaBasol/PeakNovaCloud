
import React from 'react'
import InfoTwo from './InfoTwo'
import InfoThree from './InfoThree'
import InfoCards from './InfoCards'
import InfoCardInfo from './InfoCardInfo'

export default function Info({ pageData }) {

  const data = pageData.data.find((item)=>item.section == 'home-problem')

  return (
    <div className='h-auto scroll-mt-16'>
      <div className='h-max md:h-screen flex flex-col-reverse md:grid md:grid-cols-2 lg:px-16 mt-8'>
        <InfoCardInfo data={data} />
        <InfoCards data={data} />
      </div>    
      <div className='h-auto'> 
        <InfoTwo pageData={pageData} /> 
      </div>
      <div className='h-auto '> 
        <InfoThree pageData={pageData} />
      </div>          
    </div>
  )
}
