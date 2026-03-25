'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPage } from '@/libs/utils';
import { useLocale } from 'next-intl';
import PopUp from '@/components/dashboard/PopUp';
import { createPage, deletePage, updatePage } from '@/libs/postUtils';
import { getEntityId } from '@/libs/entityId';

export default function ManagePages({ params }) {
  const [pages, setPages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const pageName = params.pageName
  const locale = useLocale();

  useEffect(() => {
    async function fetchPages() {
      try {
        setLoading(true)
        const pageData = await getPage(locale, pageName)
        setPages(pageData.data)
        setLoading(false);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchPages()
  }, [locale])

  const updateItem = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
    setError('')
  }

  const addItem = () => {
    setCurrentItem({ title: '', description: '', language: locale, section:'', image:'',buttonText:'', cards:'' })
    setIsOpen(true)
    setError('')
  }

  const deleteItem = async(_id) => {
    try {
      await deletePage({ _id:_id })
      const pageData = await getPage(locale, pageName)
      setPages(pageData.data)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }    
    
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
        
    try {
      if(getEntityId(formData)) {
        await updatePage(formData)
      } else {        
        await createPage(formData)
      }
      
      setError('Success');
      setIsOpen(false);
      
      const pageData = await getPage(locale, pageName);
      setPages(pageData.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sayfaları yönet</h1>
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Yeni ekle
      </button>      
      <div className="flex flex-col gap-4">
        {Array.isArray(pages) && pages.length > 0 ? (
          pages.map((item, i) => (
            <div
              key={i}
              className="p-4 border-2 border-black flex justify-between gap-8 items-center"
            >
              <div className="flex flex-col">
                <h6 className="font-bold">{item.section}</h6>
                
                <h6>{item.title}</h6>
                <p>{item.description}</p>    
                <h6>{item.section}</h6>            
              </div>

              <div className="flex flex-col gap-2 text-white">
                <button
                  onClick={() => updateItem(item)}
                  className="bg-[--commerce] p-2"
                >
                  Edit
                </button>
                <button onClick={()=>deleteItem(getEntityId(item))} className="bg-[--service] p-2">sil</button>
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
