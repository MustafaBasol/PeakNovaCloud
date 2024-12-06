import React from 'react'
import AboutHero from '../../../components/about-page/AboutHero'
import AboutTeam from '../../../components/about-page/AboutTeam'
import AboutVision from '../../../components/about-page/AboutVision'
import Contact from '../../../components/contact/Contact'
import AboutAction from '../../../components/about-page/AboutAction'
import Footer from '../../../components/footer/Footer'
import Faq from '../../../components/faq/Faq'
import { getAboutData, getBlogs, getFaq, getPage } from '../../../libs/utils'
import { getLocale } from 'next-intl/server'
import BlogHolder from '@/components/blog/BlogHolder'

export default async function AboutPage() {

  const locale = await getLocale()

  const aboutData = await getAboutData(locale)
  const faqData = await getFaq(locale)
  const pageData = await getPage(locale, 'about')
  const blogData = await getBlogs(locale)
  
  return (
    <div className='h-auto'>
        <AboutHero pageData={pageData} />   
        <div className='h-max md:h-[65vh] flex items-start py-16 md:py-0'>
           <AboutTeam pageData={pageData} /> 
        </div>        
        <div className='h-max md:h-[65vh] py-16 md:py-0'>
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
        <Footer color='var(--light)' />     
    </div>

  )
}
