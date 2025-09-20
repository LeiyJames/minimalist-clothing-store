'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IMAGES } from '@/constants/images'
import { ScrollSection } from '../animations/ScrollSection'

const lookbookItems = [
  {
    id: 1,
    title: 'Urban Minimalism',
    description: 'Modern streetwear essentials that blend comfort with style',
    image: '/images/lookbook/urban.jpg'
  },
  {
    id: 2,
    title: 'Monochrome Elegance',
    description: 'Sophisticated pieces in timeless black and white',
    image: '/images/lookbook/elegance.jpg'
  },
  {
    id: 3,
    title: 'Structured Forms',
    description: 'Bold silhouettes that redefine contemporary fashion',
    image: '/images/lookbook/forms.jpg'
  }
]

export function Lookbook() {
  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      <div className="container-custom">
        <ScrollSection animation="reveal" direction="up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center">
            The <span className="text-gradient">Lookbook</span>
          </h2>
        </ScrollSection>

        <div className="space-y-32">
          {lookbookItems.map((item, index) => (
            <ScrollSection
              key={item.id}
              animation="slide"
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.2}
            >
              <div
                className={`flex items-center gap-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1 space-y-6">
                  <ScrollSection animation="reveal" delay={0.2}>
                    <h3 className="text-3xl font-bold">{item.title}</h3>
                  </ScrollSection>
                  
                  <ScrollSection animation="fade" delay={0.3}>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </ScrollSection>
                  
                  <ScrollSection animation="scale" delay={0.4}>
                    <Link href="/lookbook" scroll={true}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
                      >
                        View Lookbook
                      </motion.button>
                    </Link>
                  </ScrollSection>
                </div>

                <div className="flex-1 aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <ScrollSection animation="scale" delay={0.2}>
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={1000}
                        priority
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollSection>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>
      </div>
    </section>
  )
}