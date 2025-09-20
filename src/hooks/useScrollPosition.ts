import { useEffect, useState } from 'react'

interface UseScrollPositionReturn {
  scrollY: number
  isVisible: boolean
}

export function useScrollPosition(threshold: number = 200): UseScrollPositionReturn {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsVisible(currentScrollY > threshold)
    }

    // Set initial position
    updateScrollPosition()

    // Add scroll listener with throttling for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollPosition()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { scrollY, isVisible }
}
