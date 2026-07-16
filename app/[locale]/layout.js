import "./globals.css";
import Header from "../../components/header/Header";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default async function RootLayout({ children, params:{locale} }) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className={`font-site md:!overflow-y-scroll overflow-x-hidden smooth-scrool`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
