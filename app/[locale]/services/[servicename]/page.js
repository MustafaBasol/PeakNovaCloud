import ServiceHero from "@/components/service-page/ServiceHero"
import Desc from "@/components/service-page/Desc"
import Contact from '../../../../components/contact/Contact'
import WhyService from '../../../../components/service-page/WhyService'
import Action from "@/components/service-page/Action"
import Faq from "@/components/faq/Faq"
import Footer from "@/components/footer/Footer"
import { getService, getFaq, getBlogs } from '../../../../libs/utils'
import { notFound } from "next/navigation"
import ReachUs from "@/components/service-page/ReachUs"
import { getLocale, getTranslations } from "next-intl/server"
import BlogHolder from "@/components/blog/BlogHolder"


export async function generateMetadata({ params }) {
  
  const locale = params?.locale
  const serviceData = await getService(params.servicename, locale);
  const t = await getTranslations('ServiceMetaData')

  if (!serviceData) {
    return {
      title: t('errorTitle'),
      description: t('errorDescription'),
    };
  }  
  const service = (serviceData.data)[0]
  const serviceName = service.service.split('-').join(' ')
  
  return {
    title: `${service.service.charAt(0).toUpperCase() + service.service.slice(1)} | PeakNova`,
    description: service.title,
    keywords: `
      ${t('keywords')},
      ${serviceName + ' ' + t('consulting')}, 
      ${serviceName + ' ' + t('imp')},
      ${serviceName + ' ' + t('conf')}, 
      ${serviceName + ' ' + t('tp')}, 
      ${serviceName + ' ' + t('api')}, 
      ${serviceName + ' ' + t('e')}, 
      ${serviceName + ' ' + t('app')}, 
      ${serviceName + ' ' + t('perf')}, 
      ${serviceName + ' ' + t('db')}, 
    `,
    openGraph: {
      type: 'article',
      url: `https://www.peaknovas.com//services/${service.service}`,
      title: `${service.service} | PeakNova`,
      description: service.description,
    },
  };
}

async function ServicesPage({ params }) {
  const locale = await getLocale()
  const serviceData = await getService(params.servicename, locale) 
  const blogData = await getBlogs(locale)

  if(!serviceData) {
    notFound()
  }

  const FaqData = await getFaq(locale) 
  
  const color = (serviceData.data[0].service.split('-'))[0] 
  
  return (
    <>   
      <div className="bg-[--light]">          
        <ServiceHero serviceData={serviceData} color={color} />
        <ReachUs serviceData={serviceData} color={color} />
        <Desc serviceData={serviceData} color={color} />
        <BlogHolder blogData={blogData.data} locale={locale} />        
        <div className="h-max md:h-[100vh] flex items-center">
          <Action color={color} serviceData={serviceData} />
        </div>      
        <WhyService serviceData={serviceData} color={color} />
        <Faq data={FaqData} color={color} />    
        <div className=''>
          <Contact color='white' id={'service-contact'} pageData={serviceData} />        
        </div>
        <Footer color='white' />
      </div>      
    </>

  )
}
export default ServicesPage