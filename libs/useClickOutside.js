'use client'
import { useEffect } from 'react'

export function useClickOutside(refs, onOutside, active = true) {
  useEffect(() => {
    if (!active) return

    const handler = (event) => {
      const list = Array.isArray(refs) ? refs : [refs]
      const isInside = list.some((ref) => ref.current && ref.current.contains(event.target))
      if (!isInside) {
        onOutside(event)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [refs, onOutside, active])
}
