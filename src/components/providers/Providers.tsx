'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from '@/context/CartContext'
import { ProductProvider } from '@/context/ProductContext'
import { SmoothScrollProvider } from './SmoothScrollProvider'
import { ErrorBoundary } from './ErrorBoundary'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light">
        <CartProvider>
          <ProductProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </ProductProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
