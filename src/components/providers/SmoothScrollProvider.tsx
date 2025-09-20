'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import type { LenisInstance } from '@/types/global'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const rafRef = useRef<number | null>(null)
  const lenisRef = useRef<LenisInstance | null>(null)

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    // Animation frame loop for Lenis with proper cleanup tracking
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      
      if (typeof window !== 'undefined') {
        delete window.lenis
      }
    }
  }, [])

  return <>{children}</>
}
