import { useEffect, useRef, useCallback } from 'react'

interface UseOptimizedScrollOptions {
  throttle?: number
  passive?: boolean
}

interface ScrollData {
  scrollY: number
  scrollDirection: 'up' | 'down' | 'none'
  isAtTop: boolean
  isAtBottom: boolean
}

export function useOptimizedScroll(
  callback: (data: ScrollData) => void,
  options: UseOptimizedScrollOptions = {}
) {
  const { throttle = 16, passive = true } = options
  const rafRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  callbackRef.current = callback

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight

      const scrollDirection: ScrollData['scrollDirection'] = 
        scrollY > lastScrollY ? 'down' : 
        scrollY < lastScrollY ? 'up' : 'none'

      const scrollData: ScrollData = {
        scrollY,
        scrollDirection,
        isAtTop: scrollY <= 0,
        isAtBottom: scrollY + windowHeight >= documentHeight - 10, // 10px threshold
      }

      callbackRef.current(scrollData)
      lastScrollYRef.current = scrollY
      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set initial scroll position
    lastScrollYRef.current = window.scrollY

    window.addEventListener('scroll', handleScroll, { passive })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [handleScroll, passive])
}
