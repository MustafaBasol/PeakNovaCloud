import React from 'react'
import SingleProject from '@/components/singleProjectPage/SingleProject'
import Footer from '@/components/footer/Footer'
import { getBlogs, getProject } from '@/libs/serverData'
import { notFound } from 'next/navigation'
import BlogHolder from '@/components/blog/BlogHolder'
import { getLocale } from 'next-intl/server'

export default async function SingleProjectPage({ params }) {

  const projectData = await getProject(params.projectId)
  const locale = await getLocale()  
  const blogData = await getBlogs(locale)

  
  if (!projectData) {
    notFound()
  }
  
  return (
    <div className='bg-[--light]'>
      <SingleProject projectData={projectData.data} />
      <BlogHolder blogData={blogData.data} locale={locale} />        
      <Footer color='white' />
    </div>
  )
}
