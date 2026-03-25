'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects } from '@/libs/utils';
import { useLocale } from 'next-intl';
import PopUp from '@/components/dashboard/PopUp';
import { createProject, updateProject, deleteProject } from '@/libs/postUtils';
import { getEntityId } from '@/libs/entityId';

export default function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const locale = useLocale();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const projectData = await getProjects(locale)
        setProjects(projectData.data)
        setLoading(false);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchProjects()
  }, [locale])

  const updateItem = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
    setError('')
  }

  const addItem = () => {
    setCurrentItem({ title: '', description: '', language: locale, name:'', image:'' })
    setIsOpen(true)
    setError('')
  }

  const deleteItem = async(id) => {
    try {
      await deleteProject({ id })
      const projectData = await getProjects(locale)
      setProjects(projectData.data)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }    
    
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();    
    try {
      if(getEntityId(formData)) {
        await updateProject(formData)
      } else {
        await createProject(formData)
      }
      
      setError('Success');
      setIsOpen(false);
      
      const projectData = await getProjects(locale);
      setProjects(projectData.data);
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
      <h1 className="text-3xl font-bold mb-6">Projeleri yönet</h1>
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Yeni ekle
      </button>      
      <div className="flex flex-col gap-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((item, i) => (
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
                  Düzenle
                </button>
                <button onClick={()=>deleteItem(getEntityId(item))} className="bg-[--service] p-2">Sil</button>
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
