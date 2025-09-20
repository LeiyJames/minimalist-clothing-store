'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RadioGroup } from '@headlessui/react'
import type { Product } from '@/types/product'
import { useProductContext } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export function ProductDetails({ product }: { product: Product }) {
  const { 
    selectedSize, 
    selectedColor, 
    setSelectedProduct, 
    setSelectedSize, 
    setSelectedColor 
  } = useProductContext()
  const { dispatch } = useCart()

  useEffect(() => {
    setSelectedProduct(product)
    setSelectedSize(product.sizes[0])
    setSelectedColor(product.colors[0])

    return () => {
      setSelectedProduct(null)
      setSelectedSize(null)
      setSelectedColor(null)
    }
  }, [product, setSelectedProduct, setSelectedSize, setSelectedColor])

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          {product.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-light mt-2"
        >
          ${product.price}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
        
        {/* Size Selector */}
        <div id="size-selector" className="space-y-3">
          <h3 className="text-sm font-medium">Size</h3>
          <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <RadioGroup.Option
                  key={size}
                  value={size}
                  className={({ active, checked }) =>
                    `${active ? 'ring-2 ring-primary-dark dark:ring-primary-white' : ''}
                    ${checked ? 'bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark' : 'bg-white dark:bg-gray-800'}
                    cursor-pointer rounded-lg py-3 px-3 text-sm font-medium uppercase hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200`
                  }
                >
                  {size}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Color Selector */}
        <div id="color-selector" className="space-y-3">
          <h3 className="text-sm font-medium">Color</h3>
          <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <RadioGroup.Option
                  key={color.name}
                  value={color}
                  className={({ active, checked }) =>
                    `${active ? 'ring-2 ring-primary-dark dark:ring-primary-white' : ''}
                    relative w-8 h-8 rounded-full cursor-pointer transition-all duration-200`
                  }
                  style={{ backgroundColor: color.value }}
                >
                  {({ checked }) => (
                    <span
                      className={`${
                        checked ? 'block' : 'hidden'
                      } absolute inset-0 rounded-full ring-2 ring-primary-dark dark:ring-primary-white`}
                    />
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Materials */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Materials</h3>
          <div className="space-y-2">
            {product.materials.map((material) => (
              <div key={material.name} className="flex justify-between text-sm">
                <span>{material.name}</span>
                <span>{material.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Add to Cart Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-full font-medium hover:opacity-90 transition-opacity"
          onClick={() => {
            if (!selectedSize) {
              const sizeElement = document.getElementById('size-selector');
              sizeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
            if (!selectedColor) {
              const colorElement = document.getElementById('color-selector');
              colorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
            dispatch({
              type: 'ADD_ITEM',
              payload: {
                ...product,
                selectedSize,
                selectedColor,
                quantity: 1
              }
            })
          }}
        >
          <ShoppingBagIcon className="w-5 h-5" />
          Add to Cart
        </motion.button>
      </motion.div>

      {/* Product Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border-t border-gray-200 dark:border-gray-700 pt-8"
      >
        <h3 className="text-lg font-medium mb-4">Features</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
