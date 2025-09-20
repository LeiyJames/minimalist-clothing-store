'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useScrollPosition } from '@/hooks/useScrollPosition'

interface BackToTopProps {
  /** Scroll threshold in pixels before button appears */
  threshold?: number
  /** Custom className for styling */
  className?: string
  /** Smooth scroll duration in milliseconds */
  duration?: number
}

export function BackToTop({ 
  threshold = 300, 
  className = '',
  duration = 800 
}: BackToTopProps) {
  const { isVisible } = useScrollPosition(threshold)

  const scrollToTop = () => {
    // Check if Lenis is available (smooth scrolling library)
    const lenis = window.lenis
    
    if (lenis) {
      // Use Lenis for ultra-smooth scrolling
      lenis.scrollTo(0, {
        duration: duration / 1000, // Lenis expects duration in seconds
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // Ease-out cubic
      })
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            y: 20 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            y: 20 
          }}
          whileHover={{ 
            scale: 1.1,
            y: -2
          }}
          whileTap={{ 
            scale: 0.95 
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
            duration: 0.3
          }}
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50
            w-12 h-12 
            bg-black dark:bg-white 
            text-white dark:text-black
            rounded-full 
            shadow-lg dark:shadow-white/10
            border border-gray-200 dark:border-gray-700
            flex items-center justify-center
            hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
            transition-shadow duration-200
            ${className}
          `}
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
