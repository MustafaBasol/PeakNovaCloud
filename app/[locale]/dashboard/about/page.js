'use client';
import { useState, useEffect } from 'react';
import { getAboutData } from '@/libs/utils';
import { useLocale } from 'next-intl';
import PopUp from '@/components/dashboard/PopUp';
import { createAboutData, updateAboutData, deleteAboutData } from '@/libs/postUtils';

export default function ManageAbout() {
  const [abouts, setAbouts] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const locale = useLocale();

  useEffect(() => {
    async function fetchAbout() {
      try {
        setLoading(true)
        const aboutData = await getAboutData(locale)
        setAbouts(aboutData.data)
        setLoading(false);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchAbout()
  }, [locale])

  const updateItem = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
    setError('')
  }

  const addItem = () => {
    setCurrentItem({ title: '', description: '', language: locale })
    setIsOpen(true)
    setError('')
  }

  const deleteItem = async(_id) => {
    try {
      await deleteAboutData(locale, {_id:_id})
      const aboutData = await getAboutData(locale)
      setAbouts(aboutData.data)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }    
    
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();    
    try {
      if(formData._id) {
        await updateAboutData(locale, formData)
      } else {
        await createAboutData(locale, formData)
      }
      
      setError('Success');
      setIsOpen(false);
      
      const aboutData = await getAboutData(locale);
      setAbouts(aboutData.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage About</h1>
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add New
      </button>      
      <div className="flex flex-col gap-4">
        {Array.isArray(abouts) && abouts.length > 0 ? (
          abouts.map((item, i) => (
            <div
              key={i}
              className="p-4 border-2 border-black flex justify-between gap-8 items-center"
            >
              <div className="flex flex-col">
                <h6 className="font-bold">{item.title}</h6>
                <p>{item.description}</p>
              </div>

              <div className="flex flex-col gap-2 text-white">
                <button
                  onClick={() => updateItem(item)}
                  className="bg-[--commerce] p-2"
                >
                  Edit
                </button>
                <button onClick={()=>deleteItem(item._id)} className="bg-[--service] p-2">Delete</button>
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
