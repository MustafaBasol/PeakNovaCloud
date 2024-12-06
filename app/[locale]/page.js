
import Hero from "../../components/home-page/hero/Hero"
import ServiceCall from "../../components/home-page/services/ServiceHome";
import Contact from "../../components/contact/Contact";
import Info from "../../components/home-page/info/Info";
import About from "../../components/home-page/about/About";
import ReachMe from "../../components/home-page/ReachMe";
import Faq from "../../components/faq/Faq";
import Footer from "../../components/footer/Footer";
import BlogHolder from "@/components/blog/BlogHolder";
import { getBlogs, getFaq, getPage } from "@/libs/utils";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const locale = params?.locale
  const t = await getTranslations('HomepageMetaData', locale) 

  return {
    title: t('title'), 
    description: t('description'),
    keywords: t('keywords'), 
    openGraph: {
      type: t('type'),
      url: t('url'),
      title: t('titleOG'),
      description: t('descriptionOG'),  
    },
  };
}
export default async function Home() {

const locale = await getLocale()
const FaqData = await getFaq(locale) 
const pageData = await getPage(locale, 'home') 
const blogData = await getBlogs(locale)
console.log(blogData)
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
      <Footer color='var(--light)' />
    </main>
  );
}
