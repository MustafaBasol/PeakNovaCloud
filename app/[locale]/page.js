
import Hero from "../../components/home-page/hero/Hero"
import ServiceCall from "../../components/home-page/services/ServiceHome";
import Contact from "../../components/contact/Contact";
import Info from "../../components/home-page/info/Info";
import About from "../../components/home-page/about/About";
import ReachMe from "../../components/home-page/ReachMe";
import Faq from "../../components/faq/Faq";
import Footer from "../../components/footer/Footer";
import BlogHolder from "@/components/blog/BlogHolder";
import { getBlogs, getFaq, getPage, getSeo } from "@/libs/serverData";
import { getLocale } from "next-intl/server";
import CookieAccepter from "@/components/CookieAccepter";

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

export default async function Home() {

const locale = await getLocale()
const FaqData = await getFaq(locale) 
const pageData = await getPage(locale, 'home') 
const blogData = await getBlogs(locale)

  return (
    <main className="">   
      <Hero pageData={pageData} />
      <Info pageData={pageData} />
      <div className="h-max flex items-center">
        <ReachMe pageData={pageData} />
      </div>       
      <About />
      <BlogHolder blogData={blogData.data} locale={locale} />
      <ServiceCall locale={locale} />  
      <Faq data={FaqData} color={`primary`}/>              
      <Contact id={'home-contact'} color='light' pageData={pageData} />
      <CookieAccepter locale={locale} />
      <Footer color='var(--light)' />
    </main>
  );
}
