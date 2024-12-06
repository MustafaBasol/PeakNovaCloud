import React from 'react'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import ServicesDropdown from '@/components/dashboard/Dropdown';
import PagesDropdown from '@/components/dashboard/PageDropdown';
import { useLocale } from 'next-intl';

export default function Dashboard() {

  const locale = useLocale()
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const data = [
    {
      name:'SSS',
      link: 'faq'
    },
    {
      name:'hakkında',
      link :'about'
    },
    {
      name:'logolar',
      link:'logos'
    },
    {
      name:'blog',
      link:'blogs'
    },
    {
      name:'projeler',
      link:'projects'
    },
    {
      name:"SEO'lar",
      link:'seo'
    }
  ]
  
  if (!token) { 
    redirect(`/${locale}/admin`);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    redirect(`/${locale}/admin`);
  }  

  return ( 
    <div className='grid grid-cols-3 grid-rows-3'>

          {
            data.map((item, i) => {
              return(
                <Link 
                  key={i}
                  href={`dashboard/${item.link}`}
                  className='p-4 border-2 bg-[--primary] text-white'
                >
                  <button className="w-full">{item.name}</button>
                </Link>
              )
            })
          } 
            <ServicesDropdown /> 
            <PagesDropdown />  
            
    </div>

  )
}
