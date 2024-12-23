'use client'
import React, { useState } from 'react'
import IconRenderer from '../IconRenderer';
import SmallMenu from './SmallMenu';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollLink from '../ScrollLink';

export default function SmallScreenSizeHeader({ data, locale }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const click = () => {
        setIsMenuOpen(!isMenuOpen)
        if(isMenuOpen) {
            document.body.style.overflowY = "scroll"
        } else{            
            document.body.style.overflowY = "hidden"
        }  
    }
    
  return (
    <div className='flex justify-between items-center flex-row px-8 md:hidden h-full'>
          <ScrollLink href={`/${locale}`} className=' cursor-pointer'>
            <Image
              src='/logo.png'
              width={90}
              height={90}   
              alt='logo'       
            />
          </ScrollLink>
        <IconRenderer onClick={click} iconName='RxHamburgerMenu' className='h-12 w-12 cursor-pointer' />
            <AnimatePresence>
                {
                  isMenuOpen 
                  &&
                  <SmallMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} data={data} locale={locale} /> 
                }                
            </AnimatePresence>

    </div>
  )
}
