'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '@/types/product'

interface ProductContextType {
  selectedProduct: Product | null
  selectedSize: string | null
  selectedColor: { name: string; value: string } | null
  setSelectedProduct: (product: Product | null) => void
  setSelectedSize: (size: string | null) => void
  setSelectedColor: (color: { name: string; value: string } | null) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | null>(null)

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        selectedSize,
        selectedColor,
        setSelectedProduct,
        setSelectedSize,
        setSelectedColor,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}
