'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Collection', href: '/collection' },
  { name: 'About', href: '/about' },
  { name: 'Lookbook', href: '/lookbook' }
]

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()
  const pathname = usePathname()

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  // Pages where navbar should always be visible
  const staticNavPages = ['/collection', '/about', '/lookbook']
  const shouldShowStatic = staticNavPages.includes(pathname) || pathname.startsWith('/product/')

  const heroHeightRef = useRef(0)

  useEffect(() => {
    heroHeightRef.current = window.innerHeight
  }, [])

  const handleScroll = useCallback(({ scrollY }: { scrollY: number }) => {
    if (shouldShowStatic) return // Don't handle scroll on static nav pages
    setIsVisible(scrollY > heroHeightRef.current * 0.8)
  }, [shouldShowStatic])

  useOptimizedScroll(handleScroll)

  // Render static navbar for collection, about, lookbook pages
  if (shouldShowStatic) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="container-custom">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link 
                href="/"
                className="text-xl font-bold tracking-tighter text-black dark:text-white hover:opacity-80 transition-opacity"
              >
                MINIMAL
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-black dark:text-white font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Cart Button */}
              <button 
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </>
    )
  }

  // Render dynamic navbar for home and product pages
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link 
                  href="/"
                  className="text-xl font-bold tracking-tighter"
                >
                  MINIMAL
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Cart Button */}
                <button 
                  className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Open cart"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}