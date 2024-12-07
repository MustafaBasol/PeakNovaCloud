'use client'
import React, { useState} from 'react'
import { login } from '@/libs/utils'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function Admin() {

  const [password, setPassword] = useState('')
  const router = useRouter();
  const locale = useLocale()

  const clicked = async() => {
    if(password.length !== 15) {
      return
    }
    const response = await login({ password })
    
    if (response.ok) {
      const data = await response.json();
      router.push(`/${locale}/dashboard`);
      
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  }

  return (
    <div className='w-1/2 mx-auto'>
      <div className='flex flex-col gap-4 items-center justify-center'>
          <input 
              placeholder='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className='border-2'
          >

          </input>
          <button
            className='w-max h-max border-2 border-black p-4 rounded-lg'
            onClick={clicked}
          >
            Login
          </button>
      </div>      
    </div>

  )
}
