
'use client';
import { useTranslations } from 'next-intl';
import Footer from '@/components/footer/Footer';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('lastUpdated')}</p>
      <p className="mb-4">{t('description')}</p>
      <p className="mb-4">{t('agreement')}</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-4">{t('interpretationTitle')}</h2>
      <h3 className="text-xl font-semibold mt-4 mb-2">{t('interpretationSubtitle')}</h3>
      <p className="mb-4">{t('interpretationText')}</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">{t('definitionsTitle')}</h3>
      <p className="mb-2">{t('definitionsIntro')}</p>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">
          <strong>{t('accountTitle')}</strong> {t('accountText')}
        </li>
        <li className="mb-2">
          <strong>{t('affiliateTitle')}</strong> {t('affiliateText')}
        </li>
        <li className="mb-2">
          <strong>{t('companyTitle')}</strong> {t('companyText')}
        </li>
        <li className="mb-2">
          <strong>{t('cookiesTitle')}</strong> {t('cookiesText')}
        </li>
        <li className="mb-2">
          <strong>{t('countryTitle')}</strong> {t('countryText')}
        </li>
        <li className="mb-2">
          <strong>{t('deviceTitle')}</strong> {t('deviceText')}
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t('dataCollectionTitle')}</h2>
      <h3 className="text-xl font-semibold mt-4 mb-2">{t('dataTypesTitle')}</h3>
      <h4 className="text-lg font-semibold mt-2 mb-2">{t('personalDataTitle')}</h4>
      <p className="mb-4">{t('personalDataText')}</p>
      <ul className="list-disc list-inside mb-6">
        <li>{t('email')}</li>
        <li>{t('phone')}</li>
        <li>{t('usageData')}</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">{t('trackingTitle')}</h3>
      <p className="mb-4">{t('trackingText')}</p>
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>{t('cookiesLabel')}</strong> {t('cookiesDescription')}
        </li>
        <li>
          <strong>{t('webBeaconsLabel')}</strong> {t('webBeaconsDescription')}
        </li>
      </ul>

      <p className="mb-4">{t('cookiesTypes')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">{t('useOfDataTitle')}</h2>
      <p className="mb-4">{t('useOfDataText')}</p>
      <ul className="list-disc list-inside mb-6">
        <li>{t('provideService')}</li>
        <li>{t('manageAccount')}</li>
        <li>{t('contactYou')}</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t('contactUsTitle')}</h2>
      <p>{t('contactUsText')}</p>
      <ul className="list-disc list-inside mt-4">
        <li>
          {t('emailLabel')}: 
          <a href="mailto:info@peaknovas.com" className="text-blue-600 hover:underline">
            info@peaknovas.com
          </a>
        </li>
      </ul>
    </div>
  );
}