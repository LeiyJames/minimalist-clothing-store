'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollSection } from '@/components/animations/ScrollSection'
import { IMAGES } from '@/constants/images'
import { PRODUCT_DATA } from '@/app/product/[id]/page'

// Product interface
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  tags: string[]
  isNew?: boolean
  isBestSeller?: boolean
}

// Convert PRODUCT_DATA to array and add tags
const allProducts: Product[] = Object.values(PRODUCT_DATA).map(product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.images.main,
  category: product.description.split('.')[0],
  tags: product.id === '1' || product.id === '2' || product.id === '3' ? ['essentials'] : 
        product.id === '4' || product.id === '5' ? ['new-arrivals'] : ['best-sellers'],
  isNew: product.id === '4' || product.id === '5',
  isBestSeller: product.id === '1' || product.id === '3' || product.id === '6'
}))

// Filter categories
const filterCategories = [
  { id: 'all', name: 'All', description: 'View all products' },
  { id: 'new-arrivals', name: 'New Arrivals', description: 'Latest additions' },
  { id: 'best-sellers', name: 'Best Sellers', description: 'Customer favorites' },
  { id: 'outerwear', name: 'Outerwear', description: 'Coats & jackets' },
  { id: 'shirts', name: 'Shirts', description: 'Essential shirts' },
  { id: 'accessories', name: 'Accessories', description: 'Complete your look' }
]

export function FeaturedCollection() {
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter products based on active filter
  const filteredProducts = allProducts.filter(product => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'outerwear') return product.category.toLowerCase() === 'outerwear'
    if (activeFilter === 'shirts') return product.category.toLowerCase() === 'shirts'
    if (activeFilter === 'accessories') return product.category.toLowerCase() === 'accessories'
    return product.tags.includes(activeFilter)
  })

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollSection animation="reveal" direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Featured <span className="text-gradient">Collection</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our curated selection of minimalist pieces, designed for versatility and 
              timeless style.
            </p>
          </div>
        </ScrollSection>

        {/* Filter Buttons */}
        <ScrollSection animation="reveal" direction="up" delay={0.2}>
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {filterCategories.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: activeFilter === filter.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {filter.name}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollSection>
        
        {/* Filter Description */}
        <motion.div 
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filterCategories.find(f => f.id === activeFilter)?.description} • {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Link href={`/product/${product.id}`} prefetch scroll={true}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Product Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                          >
                            New
                          </motion.span>
                        )}
                        {product.isBestSeller && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                          >
                            Best Seller
                          </motion.span>
                        )}
                      </div>

                      {/* View Product Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-2 rounded-full font-medium shadow-lg"
                        >
                          View Product
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-lg font-light">${product.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Try selecting a different filter to see more products.
            </p>
            <motion.button
              onClick={() => setActiveFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              View All Products
            </motion.button>
          </motion.div>
        )}

        {/* View All Link */}
        <ScrollSection animation="reveal" direction="up" delay={0.6}>
          <div className="text-center mt-16">
            <Link href="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                View Full Collection
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </ScrollSection>
      </div>
    </section>
  )
}
