import React from 'react'
import { getBlog, getBlogs, getPage, getSeo } from '@/libs/serverData'
import { getLocale } from 'next-intl/server'
import BlogPageImage from '@/components/singleBlog-page/BlogPageImage'
import SingleBlogContent from '@/components/singleBlog-page/SingleBlogContent'
import BlogHolder from '@/components/blog/BlogHolder'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import CookieAccepter from '@/components/CookieAccepter'
import { getEntityId } from '@/libs/entityId'

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

export default async function BlogPage({ params }) {
    

    const locale = await getLocale()
    const slug = await params.slug
    const contact = await getPage(locale, 'single')
    const blogData = (await getBlog(locale, slug)).data
    const blogsData = await getBlogs(locale)
    const filteredArray = await blogsData.data.filter((blog) => getEntityId(blogData) !== getEntityId(blog))

  return (
    <div className='bg-[--light]'>
        <BlogPageImage blogData={blogData} />
        <div className='p-4 w-full sm:w-5/6 mx-auto flex flex-col gap-4 md:px-4 py-12'>
            {
                blogData.content.map((blog, index)=> {
                    return(
                        <SingleBlogContent key={index} blog={blog} />
                    )
                })
            }
        </div>
        <div className='mt-16 md:mt-32'>
            <BlogHolder blogData={filteredArray} locale={locale} />    
        </div>
        <Contact color={'white'} pageData={contact} id={'single-contact'}  />
      <CookieAccepter locale={locale} />        
        <Footer color='white' />
    </div>
  )
}
