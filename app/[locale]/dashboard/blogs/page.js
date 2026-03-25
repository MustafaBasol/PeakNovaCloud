'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogs } from '@/libs/utils';
import { useLocale } from 'next-intl';
import PopUpBlog from '@/components/dashboard/BlogPopUp';
import { createBlog, updateBlog, deleteBlog } from '@/libs/postUtils';
import { getEntityId } from '@/libs/entityId';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const locale = useLocale();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true)
        const blogsData = await getBlogs(locale)
        setBlogs(blogsData.data)
        setLoading(false);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [locale])

  const updateItem = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
    setError('')
  }

  const addItem = () => {
    setCurrentItem({ title: '', coverImage: '', language: locale, slug:'', summary:'',seo:'', content:''  })
    setIsOpen(true)
    setError('')
  }

  const deleteItem = async(id) => {
    try {
      await deleteBlog({ id })
      const blogData = await getBlogs(locale)
      setBlogs(blogData.data)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }    
    
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();        
    try {
      if(getEntityId(formData)) {
        await updateBlog(formData, formData.slug)
      } else {
        await createBlog(formData)
      }
      
      setError('Success');
      setIsOpen(false);
      
      const blogData = await getBlogs(locale);
      setBlogs(blogData.data);
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
      <h1 className="text-3xl font-bold mb-6">Blogları yönet</h1>
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add New
      </button>      
      <div className="flex flex-col gap-4">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((item, i) => (
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
                  düzenle
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
        <PopUpBlog
          setIsOpen={setIsOpen}
          item={currentItem}
          handleSubmit={handleSubmit}
          error={error}          
        />
      )}
    </div>
  );
}
