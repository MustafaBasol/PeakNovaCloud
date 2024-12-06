import React from 'react'
import IconRenderer from '../IconRenderer'
import Image from 'next/image'

export default function ImageIcons({ pageData }) {
    
    const data = pageData.data.find((item)=>item.section == 'project-image')
    
  return (  
    <div 
        className='h-screen w-full relative'
    >
        <Image
            src={`/${data.image}`}
            alt="Projelerimiz"
            fill          
            className="z-0 object-center object-cover"
        />   
        <div className='gap-4 lg:gap-8 flex flex-col md:flex-row items-center justify-center bg-image relative px-8 md:my-16'> 
        {
            data.cards.map((item)=> {                               
                return (
                    <div 
                        key={item.id}
                        className='flex flex-col text-[--light] justify-center items-center text-center gap-2 z-10'
                    >
                        <IconRenderer iconName={item.Icon} className='md:w-16 md:h-16 w-12 h-12' />
                        <h2 className='text-sm text-lg font-semibold'>{item.title}</h2>
                        <p className='text-xs text-bse'>{item.description}</p>
                    </div>                    
                )
            })
        }
        </div> 
    </div>   
  )
}
