import SmallScreenSizeHeader from './SmallScreenSizeHeader'
import ScreenSizeHeader from './ScreenSizeHeader'
import { getLogos } from '@/libs/serverData'

export default async function Header({ locale }) {

  const { data } = await getLogos(locale)

  return (
        <div 
          className='z-50 h-24 bg-text top-0 left-0 bg-white w-full sticky text-sm text-main my-auto shadow-sm'
        >           
          <ScreenSizeHeader data={data} locale={locale} />
          <SmallScreenSizeHeader data={data} locale={locale} />
        </div>
  )
}
