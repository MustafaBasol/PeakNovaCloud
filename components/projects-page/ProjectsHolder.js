import React from 'react'
import ProjectItem from './ProjectItem'

export default function ProjectsHolder({ projectsData, pageData, locale }) {

  const data = pageData.data.find((item)=>item.section == 'project-project')
  
  return (
    <div className='h-max md:h-screen'>
        <h1 className='text-center text-2xl md:text-5xl pt-4 pb-8 text-gradient font-semibold'>{data.title}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 p-4 gap-4 '>        
            {
              projectsData.data.map((item)=> {
                return(
                    <ProjectItem item={item} key={item.id} locale={locale} />
                )
              }) 
            }          
        </div>        
    </div>

  )
}
