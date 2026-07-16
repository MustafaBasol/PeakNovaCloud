import React from 'react'
import Services from '@/components/home-page/services/Services'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import CookieAccepter from '@/components/CookieAccepter'
import { getLogos, getPage, getPageMetadata } from '@/libs/serverData'
import { getLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const locale = params?.locale
  return getPageMetadata(locale, 'home')
}

export default async function ServicesIndexPage() {
  const locale = await getLocale()
  const { data } = await getLogos(locale)
  const pageData = await getPage(locale, 'home')

  return (
    <div className='bg-[--light]'>
      <div className='h-max pt-24 pb-8 px-4'>
        <h1 className='text-center text-3xl md:text-5xl text-gradient font-semibold py-4'>
          Salesforce Services
        </h1>
        <p className='text-center max-w-2xl mx-auto text-[--text]'>
          Explore our full range of Salesforce consulting, implementation, and support services.
        </p>
      </div>
      <Services services={data} locale={locale} />
      <Contact color='white' id={'services-contact'} pageData={pageData} />
      <CookieAccepter locale={locale} />
      <Footer color='white' />
    </div>
  )
}
