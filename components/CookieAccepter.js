'use client'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const CookieAccepter = () => {
  const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('Cookie')

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");

    if (!consent) {
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000); 

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie-consent", "true", { expires: 365 })
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="z-50 fixed bottom-4 left-4 right-4 bg-[--primary] text-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center justify-between">
      <p className="mb-2 sm:mb-0">
        {t('main')} <a href="/privacy-policy" className="text-[--text] underline">{t('policy')}</a>.
      </p>
      <button
        onClick={handleAccept}
        className="bg-[--text] text-white py-2 px-4 rounded-lg"
      >
        {t('button')}
      </button>
    </div>
  );
};

export default CookieAccepter;
