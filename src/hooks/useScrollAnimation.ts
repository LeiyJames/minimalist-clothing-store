'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Only register plugin on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollAnimation() {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Optimize GSAP ticker for better performance
    gsap.ticker.lagSmoothing(0)
    
    // Store cleanup function
    cleanupRef.current = () => {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill()
      })
      
      // Kill all GSAP tweens
      gsap.killTweensOf('*')
      
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh()
    }

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [])

  // Provide cleanup function for manual cleanup if needed
  return {
    cleanup: () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }
}