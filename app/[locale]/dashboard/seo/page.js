'use client';

import { useState, useEffect } from 'react';
import { getSeos } from '@/libs/utils';
import { useLocale } from 'next-intl';
import PopUp from '@/components/dashboard/PopUp';
import { createSeo, updateSeo, deleteSeo } from '@/libs/postUtils';

export default function ManageSeo() {
  const [seo, setSeo] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const locale = useLocale();

  useEffect(() => {
    async function fetchSeo() {
      try {
        setLoading(true)
        const seoData = await getSeos(locale)
        setSeo(seoData.data)
        setLoading(false);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchSeo()
  }, [locale])

  const updateItem = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
    setError('')
  }

  const addItem = () => {
    setCurrentItem({ page:'', title: '', description: '', keywords:'', slug:'', language: locale, URL:'', ogTitle:'', ogDescription:'', ogImage:'' })
    setIsOpen(true)
    setError('')
  }

  const deleteItem = async(_id) => {
    try {
      await deleteSeo({_id:_id})
      const seoData = await getSeos(locale)
      setSeo(seoData.data)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }    
    
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();      
    let response 
    try {
      if(formData._id) {
        response = await updateSeo(formData)
      } else {
        response = await createSeo(formData)
      }
      
      setError('Success');
      setIsOpen(false);
      
      const seoData = await getSeos(locale);
      setSeo(seoData.data);
    } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
            setError(Object.values(err.response.data.errors).join(' '));
        } else {
            setError(err.message || 'An error occurred');
        }        
      
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
      <h1 className="text-3xl font-bold mb-6">SEO ları yönet</h1>
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Yeni ekle
      </button>      
      <div className="flex flex-col gap-4">
        {Array.isArray(seo) && seo.length > 0 ? (
          seo.map((item, i) => (
            <div
              key={i}
              className="p-4 border-2 border-black flex justify-between gap-8 items-center"
            >
              <div className="flex flex-col">
                <h6 className="font-bold">{item.page}</h6>
                <h6>{item.title}</h6>
              </div>

              <div className="flex flex-col gap-2 text-white">
                <button
                  onClick={() => updateItem(item)}
                  className="bg-[--commerce] p-2"
                >
                  Düzenle
                </button>
                <button onClick={()=>deleteItem(item._id)} className="bg-[--service] p-2">Sil</button>
              </div>
            </div>
          ))
        ) : (
          <p>No data</p>
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
