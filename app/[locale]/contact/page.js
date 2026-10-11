import Contact from "@/components/contact/Contact"
import Footer from "@/components/footer/Footer"
import CookieAccepter from "@/components/CookieAccepter"
import { getPage } from "@/libs/serverData"
import { getLocale } from "next-intl/server"

export async function generateMetadata() {
  return {
    title: "Proje başlatın | PeakNova",
    description: "Bugün nasıl işlediğini anlatın. Size net bir sonraki adımla dönelim.",
  }
}

export default async function ContactPage() {
  const locale = await getLocale()
  const pageData = await getPage(locale, 'home')

  return (
    <main className="bg-[--light]">
      <div className="pt-8">
        <Contact id="contact" color="light" pageData={pageData} />
      </div>
      <CookieAccepter locale={locale} />
      <Footer color="var(--light)" />
    </main>
  )
}
