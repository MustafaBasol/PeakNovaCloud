'use client'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Link from "next/link";

const CookieAccepter = ({ locale }) => {
  const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('Cookie')

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");

    if (!consent) {

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie-consent", "true", { expires: 365 })
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set("cookie-consent", "false", { expires: 365 })
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="z-50 fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-white dark:bg-gray-800 text-[--text] dark:text-gray-100 p-5 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
      <p className="text-sm leading-relaxed">
        {t('main')} <Link href={`/${locale}/policy`} className="text-[--primary] underline">{t('policy')}</Link>.
      </p>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={handleDecline}
          className="py-2 px-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-[--text] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {t('decline')}
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="bg-[--primary] text-white py-2 px-4 rounded-lg hover:bg-[--hovered] transition-colors"
        >
          {t('button')}
        </button>
      </div>
    </div>
  );
};

export default CookieAccepter;
