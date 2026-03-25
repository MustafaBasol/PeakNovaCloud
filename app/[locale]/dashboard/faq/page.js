'use client';

import { useState, useEffect } from 'react';
import { getFaq } from '@/libs/utils';
import { useLocale } from 'next-intl';
import PopUp from '@/components/dashboard/PopUp';
import { createFaq, updateFaq, deleteFaq } from '@/libs/postUtils';
import { getEntityId } from '@/libs/entityId';

export default function ManageFaq() {
  const [faqs, setFaqs] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const locale = useLocale();

  useEffect(() => {
    async function fetchFaq() {
      try {
        setLoading(true)
        const faqData = await getFaq(locale)
        setFaqs(faqData.data)
        setLoading(false);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchFaq()
  }, [locale])

  const updateItem = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
    setError('')
  }

  const addItem = () => {
    setCurrentItem({ question: '', answer: '', language: locale })
    setIsOpen(true)
    setError('')
  }

  const deleteItem = async(_id) => {
    try {
      await deleteFaq(locale, {_id:_id})
      const faqData = await getFaq(locale)
      setFaqs(faqData.data)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }    
    
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();    
    console.log(formData)
    try {
      if(getEntityId(formData)) {
        await updateFaq(locale, formData)
      } else {
        await createFaq(locale, formData)
      }
      
      setError('Success');
      setIsOpen(false);
      
      const faqData = await getFaq(locale);
      setFaqs(faqData.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (fetchError) {
    return <div>Error {fetchError}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">SSS leri yönet</h1>
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        yeni ekle
      </button>      
      <div className="flex flex-col gap-4">
        {Array.isArray(faqs) && faqs.length > 0 ? (
          faqs.map((item, i) => (
            <div
              key={i}
              className="p-4 border-2 border-black flex justify-between gap-8 items-center"
            >
              <div className="flex flex-col">
                <h6 className="font-bold">{item.question}</h6>
                <p>{item.answer}</p>
              </div>

              <div className="flex flex-col gap-2 text-white">
                <button
                  onClick={() => updateItem(item)}
                  className="bg-[--commerce] p-2"
                >
                  Edit
                </button>
                <button onClick={()=>deleteItem(getEntityId(item))} className="bg-[--service] p-2">Sil</button>
              </div>
            </div>
          ))
        ) : (
          <p>Data yok</p>
        )}
      </div>

      {isOpen && currentItem && (
        <PopUp
          setIsOpen={setIsOpen}
          item={currentItem}
          handleSubmit={handleSubmit}
          error={error}          
        />
      )}
    </div>
  );
}
