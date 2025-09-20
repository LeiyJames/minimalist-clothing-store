'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from 'framer-motion'

interface DraggableScrollProps {
  children: ReactNode
  className?: string
  showScrollbar?: boolean
}

export function DraggableScroll({ 
  children, 
  className = '', 
  showScrollbar = false 
}: DraggableScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  // Spring animation for smooth scrolling
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(dragX, springConfig)

  // Calculate progress for the scroll indicator
  const progress = useTransform(
    dragX,
    [0, -(contentWidth - width)],
    [0, 1]
  )

  useEffect(() => {
    if (!ref.current) return
    
    const updateSize = () => {
      setWidth(ref.current?.clientWidth ?? 0)
      setContentWidth(ref.current?.scrollWidth ?? 0)
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Auto-scroll animation
  const autoScroll = useMotionValue(0)
  const baseVelocity = 0.5

  useAnimationFrame((t, delta) => {
    if (!isDragging && contentWidth > width) {
      let moveBy = baseVelocity * delta

      // Reset when reaching the end
      if (Math.abs(autoScroll.get()) > contentWidth - width) {
        autoScroll.set(0)
      }

      autoScroll.set(autoScroll.get() + moveBy)
      dragX.set(-autoScroll.get())
    }
  })

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        className={`overflow-hidden ${className}`}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{
            left: -(contentWidth - width),
            right: 0
          }}
          style={{ x }}
          className="flex cursor-grab active:cursor-grabbing"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      {showScrollbar && contentWidth > width && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
          <motion.div
            className="h-full bg-primary-dark dark:bg-primary-white"
            style={{
              scaleX: progress,
              transformOrigin: 'left'
            }}
          />
        </div>
      )}
    </div>
  )
}
