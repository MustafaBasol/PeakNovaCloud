"use client"

import React, { useState } from 'react'
import Link from 'next/link'

const pages = [
    "home",
    "projects",
    "about",
    "blogs"
]

export default function PagesDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left border-2 bg-[--primary] text-white">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex justify-center items-center w-full h-full text-sm font-medium text-white bg-[--primary] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sayfalar
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      { 
        isOpen 
        && 
        (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {
            pages.map((page) => (
              <Link
                key={page}
                href={`dashboard/pages/${page}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {page}
              </Link>
            ))
            }
          </div>
        </div>
      )}
    </div>
  )
}
