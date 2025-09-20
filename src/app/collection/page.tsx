'use client'

import { ScrollSection } from '@/components/animations/ScrollSection'
import { IMAGES } from '@/constants/images'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCT_DATA } from '@/app/product/[id]/page'

// Group products by collection
const essentialProducts = [PRODUCT_DATA['1'], PRODUCT_DATA['2'], PRODUCT_DATA['3']]
const newArrivalsProducts = [PRODUCT_DATA['4'], PRODUCT_DATA['5']]
const bestSellersProducts = [PRODUCT_DATA['1'], PRODUCT_DATA['3'], PRODUCT_DATA['6']]

const collections = [
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Timeless pieces for your everyday wardrobe',
    products: essentialProducts
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Latest additions to our collection',
    products: newArrivalsProducts
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    description: 'Our most popular pieces',
    products: bestSellersProducts
  }
]

export default function CollectionPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-light to-primary-white dark:from-primary-dark dark:to-[#333333]">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
              Our <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our curated selection of minimalist clothing, designed for those who appreciate simplicity and quality.
            </p>
          </ScrollSection>
        </div>
      </section>

      {/* Collections */}
      {collections.map((collection, collectionIndex) => (
        <section key={collection.id} className="py-20 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <ScrollSection animation="reveal" direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{collection.name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">{collection.description}</p>
            </ScrollSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collection.products.map((product, index) => (
                <ScrollSection
                  key={product.id}
                  animation="reveal"
                  direction="up"
                  delay={index * 0.1}
                >
                  <Link href={`/product/${product.id}`} prefetch scroll={true}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={product.images.main}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {product.description.split('.')[0]}
                            </p>
                          </div>
                          <span className="text-lg font-light">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
