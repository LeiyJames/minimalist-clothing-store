'use client'

import { ScrollSection } from '@/components/animations/ScrollSection'
import Image from 'next/image'
import Link from 'next/link'
import { IMAGES } from '@/constants/images'
import { useEffect } from 'react'

const lookbookSections = [
  {
    title: 'Urban Minimalism',
    description: 'Contemporary silhouettes in motion, capturing the essence of modern city life.',
    images: [
      '/images/lookbook/urban.jpg',
      IMAGES.products.pic1.main,
      IMAGES.products.pic2.main
    ]
  },
  {
    title: 'Monochrome Elegance',
    description: 'A study in black and white, showcasing the power of simplicity.',
    images: [
      '/images/lookbook/elegance.jpg',
      IMAGES.products.pic3.main,
      IMAGES.products.pic4.main
    ]
  },
  {
    title: 'Structured Forms',
    description: 'Where architectural inspiration meets fashion, creating bold silhouettes.',
    images: [
      '/images/lookbook/forms.jpg',
      IMAGES.products.pic5.main,
      IMAGES.products.pic6.main
    ]
  }
]

export default function LookbookPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-light to-primary-white dark:from-primary-dark dark:to-[#333333]">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
              The <span className="text-gradient">Lookbook</span>
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our latest collection through a lens of minimalist aesthetics and contemporary style.
            </p>
          </ScrollSection>
        </div>
      </section>

      {/* Lookbook Sections */}
      {lookbookSections.map((section, sectionIndex) => (
        <section 
          key={section.title} 
          className={`py-20 ${
            sectionIndex % 2 === 0 
              ? 'bg-white dark:bg-gray-900' 
              : 'bg-primary-light dark:bg-primary-dark'
          }`}
        >
          <div className="container-custom">
            <ScrollSection animation="reveal" direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
                {section.description}
              </p>
            </ScrollSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.images.map((image, index) => (
                <ScrollSection
                  key={index}
                  animation="reveal"
                  direction="up"
                  delay={index * 0.1}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${section.title} image ${index + 1}`}
                      width={800}
                      height={1000}
                      priority
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-gradient">Shop?</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore our collection and find your perfect pieces.
              </p>
              <Link 
                href="/collection"
                className="inline-block px-8 py-3 bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
              >
                View Collection
              </Link>
            </div>
          </ScrollSection>
        </div>
      </section>
    </main>
  )
}