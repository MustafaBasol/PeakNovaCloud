import React from 'react'
import parse from 'html-react-parser';
import Image from 'next/image';

export default function SingleBlogContent({ blog }) {
    const content = (typeof blog.content) == 'string' ? blog.content : ''
    
  return (
    <div         
        className='flex flex-col para-tag gap-8'
    >
        {
            blog.type === 'text'
            ?
                <div className='p-4'> 
                    <h3 className='font-semibold text-lg md:text-xl'>{blog.title}</h3>
                    <p className='text-sm md:text-base leading-relaxed	'>{parse(content)}</p>                     
                </div>

            :
            <div className='p-4 flex flex-col gap-2 w-full md:w-5/6 mx-auto'>
                <div className='w-full'>
                    <Image 
                        src={blog.imageUrl}                                                
                        layout='responsive'
                        width={16}
                        height={9}                        
                        alt={blog.caption}
                    />            
                </div>     
                <h6 className='text-center'>{blog.caption}</h6>              
            </div>                       
        }
    </div>
  )
}
