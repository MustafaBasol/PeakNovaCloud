import React from 'react'
import Contact from '../../../components/contact/Contact'
import ImageIcons from '../../../components/projects-page/ImageIcons'
import Schema from '../../../components/projects-page/Schema'
import ProjectsHolder from '../../../components/projects-page/ProjectsHolder'
import Faq from '../../../components/faq/Faq'
import Footer from '../../../components/footer/Footer'
import { getProjects, getFaq, getPage } from '../../../libs/utils'
import ProjectsHero from '@/components/projects-page/ProjectsHero'
import { getLocale } from "next-intl/server";
import { getSeo } from '../../../libs/utils'

export async function generateMetadata({ params }) {
  const locale = params?.locale
  const home = await getSeo(locale, 'home')
  const page = await (home.data)[0]
  
  return {
    title: page.title, 
    description: page.title,
    keywords: page.keywords, 
    openGraph: {
      type: 'website',
      url:page.URL || 'https://www.peaknovas.com/',
      title: page.ogTitle || 'Professional Salesforce Services | PeakNova',
      description: page.description || 'Professional Salesforce Services | PeakNova', 
      image:page.ogImage || '' 
    },
  };
}

export default async function ProjectPage() {

  const locale = await getLocale()
  const projectsData = await getProjects(locale)
  const faqData = await getFaq(locale)
  const pageData = await getPage(locale, 'project')
  
  return (
    <div className=''>     
        <ProjectsHero pageData={pageData} />
        <Schema pageData={pageData} />
        <ProjectsHolder projectsData={projectsData} pageData={pageData} locale={locale} />
        <ImageIcons pageData={pageData} /> 
        <Faq data={faqData} color='primary' />        
        <Contact id={'project-contact'} color='light' pageData={pageData} />
        <Footer color='var(--light)' />
    </div>
  )
}
