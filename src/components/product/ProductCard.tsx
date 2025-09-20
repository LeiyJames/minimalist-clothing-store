'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '@/types/product'
import { QuickViewModal } from './QuickViewModal'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
  index: number
  priority?: boolean
}

export function ProductCard({ product, index, priority = false }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { dispatch } = useCart()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative w-[300px] flex-none"
      >
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
              />
            </motion.div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white dark:bg-gray-900 rounded-full text-sm font-medium flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  setIsQuickViewOpen(true)
                }}
              >
                Quick View
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } })
                }}
              >
                <ShoppingBagIcon className="w-4 h-4" />
                Add to Cart
              </motion.button>
            </div>

            {/* Color Options */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.colors.map((color) => (
                <motion.div
                  key={color.name}
                  whileHover={{ scale: 1.2 }}
                  className="w-4 h-4 rounded-full border border-white dark:border-gray-700"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-4 space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex justify-between items-start"
            >
              <h3 className="text-lg font-medium group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors duration-200">
                {product.name}
              </h3>
              <span className="text-lg font-light">
                ${product.price}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
            >
              {product.description}
            </motion.p>

            {/* Size Options */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex gap-2 pt-2"
            >
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  {size}
                </span>
              ))}
            </motion.div>
          </div>
        </Link>
      </motion.div>

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        productName={product.name}
      />
    </>
  )
}