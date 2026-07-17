import React from 'react'
import AboutHero from '../../../components/about-page/AboutHero'
import AboutTeam from '../../../components/about-page/AboutTeam'
import AboutVision from '../../../components/about-page/AboutVision'
import Contact from '../../../components/contact/Contact'
import AboutAction from '../../../components/about-page/AboutAction'
import Footer from '../../../components/footer/Footer'
import Faq from '../../../components/faq/Faq'
import { getAboutData, getBlogs, getFaq, getPage, getPageMetadata } from '@/libs/serverData'
import { getLocale } from 'next-intl/server'
import BlogHolder from '@/components/blog/BlogHolder'
import CookieAccepter from '@/components/CookieAccepter'

export async function generateMetadata({ params }) {
  const locale = params?.locale
  return getPageMetadata(locale, 'about')
}


export default async function AboutPage() {

  const locale = await getLocale()

  const aboutData = await getAboutData(locale)
  const faqData = await getFaq(locale)
  const pageData = await getPage(locale, 'about')
  const blogData = await getBlogs(locale)
  
  return (
    <div className='h-auto'>
        <AboutHero pageData={pageData} />   
        <div className='h-auto flex items-start py-14 md:py-16'>
           <AboutTeam pageData={pageData} />
        </div>
        <div className='h-auto py-8 md:py-16'>
          <AboutAction pageData={pageData} />
        </div>
        <div className='h-auto py-16 md:py-0'>
            {
                aboutData.data.map((item, i) => {
                    return (
                        <AboutVision key={i} item={item} />
                    )
                })
            }            
        </div>
        <BlogHolder blogData={blogData.data} locale={locale} />
        <Faq data={faqData} color='primary' />
        <Contact id={'about-contact'} color='light' pageData={pageData} /> 
        <CookieAccepter locale={locale} />        
        <Footer color='var(--light)' />     
    </div>

  )
}
