'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Sample product data - replace with your actual products
const products = [
  {
    id: 1,
    name: 'Essential Blazer',
    price: '$289',
    image: '/products/blazer.jpg'
  },
  {
    id: 2,
    name: 'Minimal Coat',
    price: '$349',
    image: '/products/coat.jpg'
  },
  {
    id: 3,
    name: 'Classic Shirt',
    price: '$129',
    image: '/products/shirt.jpg'
  },
  {
    id: 4,
    name: 'Tailored Pants',
    price: '$189',
    image: '/products/pants.jpg'
  },
  {
    id: 5,
    name: 'Signature Dress',
    price: '$259',
    image: '/products/dress.jpg'
  }
]

export function Collection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden bg-primary-light dark:bg-primary-dark"
    >
      <motion.div style={{ opacity }} className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center"
        >
          Latest <span className="text-gradient">Collection</span>
        </motion.h2>

        <div className="relative">
          <div className="flex space-x-8 overflow-x-auto pb-12 scrollbar-hide">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="flex-none w-80"
              >
                <div className="group relative aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                    {/* Replace with actual images */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      [Product Image]
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white text-xl font-medium">{product.name}</h3>
                    <p className="text-gray-200 mt-2">{product.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-light dark:from-primary-dark to-transparent w-20 h-full pointer-events-none" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-primary-light dark:from-primary-dark to-transparent w-20 h-full pointer-events-none" />
        </div>
      </motion.div>
    </section>
  )
}
