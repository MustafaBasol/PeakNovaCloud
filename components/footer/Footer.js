import React from 'react'
import FooterServices from './FooterServices'
import Image from 'next/image'
import FooterUsefulLinks from './FooterUsefulLinks'
import FooterContact from './FooterContact'
import Link from 'next/link'
import { getLogos } from '@/libs/serverData'
import { getTranslations, getLocale } from 'next-intl/server'
  
export default async function Footer({ color }) {

    const locale = await getLocale()
    const { data } = await getLogos(locale)
    const t = await getTranslations("Footer")
    
  return (
    <div className='h-max' style={{ backgroundColor:color }}>
        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-evenly p-8'>
            <FooterServices data={data} locale={locale} />
            <FooterUsefulLinks locale={locale} />
            <FooterContact />            
        </div>
        <hr className='w-5/6 text-black ' />
        <div className='flex flex-col md:flex-row justify-between items-center p-4 gap-2'>
            <div>
                <Image 
                    width={70}
                    height={70}
                    alt='logo'
                    src={'/logo.png'}
                />
            </div>            
            <div>
                <h6 className='text-sm text-center'>{t('term')}</h6>
            </div>
            <div>
                <Link className='text-xs text-center' href="https://storyset.com/online">illustrations by Storyset</Link>
            </div>
        </div>
    </div>
  )
}
