'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function BlogHero() {
    
    const t = useTranslations('BlogsHero')

  return (
    <div className="relative text-white min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 ">
        <Image
          src="/blogs.jpg" 
          alt="Salesforce News"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="relative text-center z-10 max-w-3xl p-5 bg-[--primary] rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md">
          {t('title1') + ' '}
          <span className="text-[--slack]">{t('title2')}</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-md">
          {t('description') + ' '}
          <span className="font-semibold">{t('name')}</span>.
        </p>
        <div className="mt-8">
          <motion.button
            className={`px-6 py-3 rounded-lg font-medium text-white `}
            initial={{ backgroundColor:'var(--slack)'}}
            whileHover={{ backgroundColor:'var(--text)'}}
          >
            {t('button')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
