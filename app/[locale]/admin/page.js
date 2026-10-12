'use client'
import React, { useState} from 'react'
import { login } from '@/libs/utils'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function Admin() {

  const [password, setPassword] = useState('')
  const [failed, setFailed] = useState(false)
  const router = useRouter();
  const locale = useLocale()

  const clicked = async (event) => {
    event.preventDefault()
    if (!password) return
    const response = await login({ password })

    if (response.ok) {
      router.push(`/${locale}/dashboard`);
    } else {
      setFailed(true)
    }
  }

  return (
    <form onSubmit={clicked} className='w-full max-w-sm mx-auto px-4 pt-24'>
      <div className='flex flex-col gap-4'>
          <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder='password'
              value={password}
              onChange={(e)=>{ setPassword(e.target.value); setFailed(false) }}
              className='w-full border-2 p-3'
          />
          <button
            type="submit"
            className='border-2 border-black p-4 rounded-lg'
          >
            Login
          </button>
          {failed ? <p className="text-sm">Giriş başarısız.</p> : null}
      </div>
    </form>
  )
}
