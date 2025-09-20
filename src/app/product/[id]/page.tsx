'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { IMAGES } from '@/constants/images'
import { ProductViewer } from '@/components/product/ProductViewer'
import { ProductDetails } from '@/components/product/ProductDetails'
import { ScrollSection } from '@/components/animations/ScrollSection'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

// Product type definition
type Product = {
  id: string
  name: string
  price: number
  description: string
  sizes: string[]
  colors: Array<{ name: string; value: string }>
  modelPath: string
  images: {
    main: string
    details: string[]
  }
  features: string[]
  materials: Array<{ name: string; percentage: number }>
}

// Product data
export const PRODUCT_DATA: Record<string, Product> = {
  '1': {
  id: '1',
    name: 'Striped Button-Up Shirt',
  price: 289,
  description: 'A timeless blazer crafted with precision. Features a clean silhouette and sustainable materials for the modern minimalist wardrobe.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Charcoal', value: '#2A2A2A' },
    { name: 'Stone', value: '#D3D3D3' },
    { name: 'Navy', value: '#2B3A67' }
  ],
  modelPath: '',
  images: {
      main: IMAGES.products.pic1.main,
      details: [
        IMAGES.products.pic1.main,
        IMAGES.products.pic2.main,
        IMAGES.products.pic3.main
      ]
  },
  features: [
    'Tailored fit with modern proportions',
    'Sustainable wool blend fabric',
    'Minimalist single-button closure',
    'Fully lined interior',
    'Two front flap pockets',
    'Single back vent'
  ],
  materials: [
    { name: 'Recycled Wool', percentage: 60 },
    { name: 'Organic Cotton', percentage: 30 },
    { name: 'Recycled Polyester', percentage: 10 }
  ]
  },
  '2': {
    id: '2',
    name: 'Denim Jacket',
    price: 349,
    description: 'An elegant coat that combines minimalist design with maximum comfort. Perfect for any season.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', value: '#C19A6B' },
      { name: 'Black', value: '#000000' },
      { name: 'Grey', value: '#808080' }
    ],
    modelPath: '',
    images: {
      main: IMAGES.products.pic2.main,
      details: [
        IMAGES.products.pic2.main,
        IMAGES.products.pic3.main,
        IMAGES.products.pic4.main
      ]
    },
    features: [
      'Premium wool blend',
      'Clean, minimal design',
      'Hidden button closure',
      'Side pockets',
      'Fully lined',
      'All-season weight'
    ],
    materials: [
      { name: 'Wool', percentage: 70 },
      { name: 'Cashmere', percentage: 20 },
      { name: 'Polyester', percentage: 10 }
    ]
  },
  '3': {
    id: '3',
    name: 'Casual T-Shirt',
    price: 129,
    description: 'A versatile shirt that combines classic style with modern comfort. Perfect for both casual and formal occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Light Blue', value: '#ADD8E6' },
      { name: 'Pink', value: '#FFC0CB' }
    ],
    modelPath: '',
    images: {
      main: IMAGES.products.pic3.main,
      details: [
        IMAGES.products.pic3.main,
        IMAGES.products.pic4.main,
        IMAGES.products.pic5.main
      ]
    },
    features: [
      'Premium cotton construction',
      'Modern slim fit',
      'Mother of pearl buttons',
      'Reinforced collar',
      'Single chest pocket',
      'Split yoke design'
    ],
    materials: [
      { name: 'Organic Cotton', percentage: 80 },
      { name: 'Elastane', percentage: 20 }
    ]
  },
  '4': {
    id: '4',
    name: 'Patterned Sweater',
    price: 189,
    description: 'A luxurious wool sweater that offers warmth without compromising on style. Perfect for layering.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', value: '#FFFDD0' },
      { name: 'Navy', value: '#000080' },
      { name: 'Burgundy', value: '#800020' }
    ],
    modelPath: '',
    images: {
      main: IMAGES.products.pic4.main,
      details: [
        IMAGES.products.pic4.main,
        IMAGES.products.pic5.main,
        IMAGES.products.pic6.main
      ]
    },
    features: [
      'Premium merino wool',
      'Ribbed cuffs and hem',
      'Crew neck design',
      'Seamless construction',
      'Temperature regulating',
      'Naturally odor-resistant'
    ],
    materials: [
      { name: 'Merino Wool', percentage: 85 },
      { name: 'Nylon', percentage: 15 }
    ]
  },
  '5': {
    id: '5',
    name: 'Hooded Sweatshirt',
    price: 159,
    description: 'Perfectly tailored pants that offer both comfort and sophistication. A wardrobe essential.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
      { name: 'Grey', value: '#808080' }
    ],
    modelPath: '',
    images: {
      main: IMAGES.products.pic5.main,
      details: [
        IMAGES.products.pic5.main,
        IMAGES.products.pic6.main,
        IMAGES.products.pic1.main
      ]
    },
    features: [
      'Italian wool blend',
      'Slim fit design',
      'Hook and bar closure',
      'Side pockets',
      'Back welt pockets',
      'Unfinished hem for tailoring'
    ],
    materials: [
      { name: 'Wool', percentage: 65 },
      { name: 'Polyester', percentage: 30 },
      { name: 'Elastane', percentage: 5 }
    ]
  },
  '6': {
    id: '6',
    name: 'Zip-Up Hoodie',
    price: 429,
    description: 'A premium jacket that combines sophisticated style with practical functionality. Perfect for any occasion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Brown', value: '#964B00' },
      { name: 'Olive', value: '#808000' }
    ],
    modelPath: '',
    images: {
      main: IMAGES.products.pic6.main,
      details: [
        IMAGES.products.pic6.main,
        IMAGES.products.pic1.main,
        IMAGES.products.pic2.main
      ]
    },
    features: [
      'Water-resistant shell',
      'Premium YKK zippers',
      'Multiple pockets',
      'Adjustable cuffs',
      'Storm flap',
      'Interior phone pocket'
    ],
    materials: [
      { name: 'Cotton', percentage: 55 },
      { name: 'Polyamide', percentage: 35 },
      { name: 'Elastane', percentage: 10 }
    ]
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = PRODUCT_DATA[params.id as keyof typeof PRODUCT_DATA]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!product) {
    return (
      <main className="min-h-screen pt-16">
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full"
          >
            Go Back
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-4 md:left-8 top-24 z-50"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-full shadow-lg hover:shadow-xl"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-[90vh] bg-gradient-to-b from-primary-light to-primary-white dark:from-primary-dark dark:to-[#333333] py-16">
        <div className="container-custom h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <ScrollSection animation="reveal" direction="left">
              <div className="sticky top-24 h-[600px] w-full">
                {product.modelPath ? (
                  <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <ProductViewer />
                  </div>
                ) : (
                  <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <Image
                      src={product.images.main}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
            </ScrollSection>

            {/* Product Details */}
            <ScrollSection animation="reveal" direction="right">
              <div className="pt-8 lg:pt-0">
                <ProductDetails product={product} />
              </div>
            </ScrollSection>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Product <span className="text-gradient">Features</span>
            </h2>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, index) => (
              <ScrollSection
                key={index}
                animation="reveal"
                direction="up"
                delay={index * 0.1}
              >
                <div className="p-6 bg-primary-light dark:bg-primary-dark rounded-xl">
                  <p className="text-lg">{feature}</p>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-20 bg-primary-light dark:bg-primary-dark">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Product <span className="text-gradient">Gallery</span>
            </h2>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.images.details.map((image, index) => (
              <ScrollSection
                key={index}
                animation="reveal"
                direction="up"
                delay={index * 0.1}
              >
                <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={`${product.name} detail ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Premium <span className="text-gradient">Materials</span>
            </h2>
          </ScrollSection>

          <div className="max-w-2xl mx-auto">
            {product.materials.map((material, index) => (
              <ScrollSection
                key={material.name}
                animation="reveal"
                direction="up"
                delay={index * 0.1}
              >
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium">{material.name}</span>
                    <span className="text-lg">{material.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${material.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary-dark dark:bg-primary-white"
                    />
                  </div>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}