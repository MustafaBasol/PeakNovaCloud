import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../../components/header/Header";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({ children, params:{locale} }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} md:!overflow-y-scroll overflow-x-hidden smooth-scrool`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}             
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
