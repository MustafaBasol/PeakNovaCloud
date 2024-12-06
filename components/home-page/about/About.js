
import AboutTexts from './AboutTexts'
import { getAboutData } from '@/libs/utils'
import { getLocale } from 'next-intl/server'

export default async function About() {
    
    const locale = await getLocale()
    const { data } = await getAboutData(locale)
    
  return (
    <div 
        className='p-4 py-16 flex flex-col gap-16 h-max md:mt-32'        
        id='home-about'
    >
        {
            data.map((item, i) => {
                return(
                    <div key={i}>
                        <AboutTexts item={item} />
                    </div>                
                )
            })
        }
    </div>
  )
}
