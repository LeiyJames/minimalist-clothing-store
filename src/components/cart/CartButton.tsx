'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import { CartDrawer } from './CartDrawer'
import { usePathname } from 'next/navigation'
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll'

export function CartButton() {
  const [isVisible, setIsVisible] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()
  const pathname = usePathname()

  // Only show on home page and product pages
  const shouldShow = pathname === '/' || pathname.startsWith('/product/')

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const handleScroll = useCallback(({ scrollY }: { scrollY: number }) => {
    if (!shouldShow) return
    const heroHeight = window.innerHeight
    setIsVisible(scrollY < heroHeight * 0.8)
  }, [shouldShow])

  useOptimizedScroll(handleScroll)

  if (!shouldShow) return null

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed z-40 top-6 right-6 p-3 rounded-full bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark shadow-lg"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBagIcon className="h-6 w-6" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}