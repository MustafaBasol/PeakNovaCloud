import React from 'react'
import { getBlogs } from '@/libs/utils'
import { getLocale } from 'next-intl/server'
import BlogItem from '@/components/blogs-page/BlogItem'
import { getPage } from '@/libs/utils'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import BlogHero from '@/components/blogs-page/BlogHero'


export default async function Blog() {
  const locale = await getLocale()
  const blogsData = await getBlogs(locale)
  const pageData = await getPage(locale, 'blogs')
  const hero = pageData.data.find((hero) => hero.section === 'blogs-hero')

  return (
    <div className='bg-[--light]'>
    <BlogHero hero={hero} />
    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-11/12 mx-auto py-32'>
      {
        blogsData.data.map((blog) => {
          return(
            <BlogItem key={blog._id} blog={blog} locale={locale} />
          )
        })
      }
    </div>    
    <Contact color={'white'} pageData={pageData} id={'blogs-contact'}  />
    <Footer color='white' /> 
    </div>
  )
}
