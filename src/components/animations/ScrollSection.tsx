'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollSectionProps {
  children: ReactNode
  animation?: 'fade' | 'reveal' | 'scale' | 'slide'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export function ScrollSection({
  children,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  className = ''
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const getInitialProps = () => {
      switch (animation) {
        case 'reveal':
          return {
            opacity: 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0
          }
        case 'scale':
          return { opacity: 0, scale: 0.97 }
        case 'slide':
          return {
            x: direction === 'left' ? '30%' : direction === 'right' ? '-30%' : 0,
            y: direction === 'up' ? '30%' : direction === 'down' ? '-30%' : 0
          }
        case 'fade':
        default:
          return { opacity: 0, y: 10 }
      }
    }

    const element = sectionRef.current
    const trigger = triggerRef.current

    // Set initial state
    gsap.set(element, getInitialProps())

    // Create animation
    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.4,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        markers: false
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [animation, direction, delay])

  return (
    <div ref={triggerRef}>
      <div ref={sectionRef} className={className}>
        {children}
      </div>
    </div>
  )
}