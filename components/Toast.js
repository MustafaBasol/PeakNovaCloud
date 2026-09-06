'use client'
import React from 'react'
import * as Toast from '@radix-ui/react-toast';
import { useTranslations } from 'next-intl';
import IconRenderer from './IconRenderer';

const VARIANT_STYLES = {
  success: {
    className: 'bg-[--primary] text-white',
    icon: 'FaCircleCheck',
  },
  error: {
    className: 'bg-[--service] text-white',
    icon: 'FaCircleExclamation',
  },
}

export default function Toaster({ isOpen, setIsOpen, variant = 'success' }) {

  const t = useTranslations('Toast')
  const message = variant === 'error' ? t('errorToast') : t('toast')
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.success

  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      <Toast.Root
        className={`${styles.className} rounded-lg shadow-xl flex items-center gap-3 p-4 pr-3
          data-[state=open]:animate-slideIn
          data-[state=closed]:animate-hide
          data-[swipe=cancel]:translate-x-0
          data-[swipe=end]:animate-swipeOut
          data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]`}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <IconRenderer iconName={styles.icon} className="w-5 h-5 shrink-0" />
        <Toast.Title className="flex-1 font-medium text-[15px]">
          {message}
        </Toast.Title>
        <Toast.Close
          aria-label="Close"
          className="shrink-0 rounded-full p-1 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition-colors"
        >
          <IconRenderer iconName="IoMdClose" className="w-4 h-4" />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  )
}
