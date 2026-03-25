import React from 'react'
import Services from './Services'
import { getLogos } from '@/libs/serverData'


export default async function ServiceCall({ locale }) {
  
    const { data } = await getLogos(locale)
    
  return (
    <div>
        <Services services={data} locale={locale} />
    </div>
  )
}
