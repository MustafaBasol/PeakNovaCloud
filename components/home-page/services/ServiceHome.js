import React from 'react'
import Services from './Services'
import { getLogos } from '@/libs/utils'


export default async function ServiceCall({ locale }) {
  
    const { data } = await getLogos(locale)
    
  return (
    <div>
        <Services services={data} locale={locale} />
    </div>
  )
}
