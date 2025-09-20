'use client'

import { ScrollSection } from '@/components/animations/ScrollSection'
import Image from 'next/image'
import { IMAGES } from '@/constants/images'

const values = [
  {
    title: 'Sustainability',
    description: 'We believe in creating fashion that respects our planet. All our materials are sustainably sourced and our production processes are environmentally conscious.'
  },
  {
    title: 'Quality',
    description: 'Every piece is crafted with meticulous attention to detail, using premium materials to ensure longevity and timeless style.'
  },
  {
    title: 'Minimalism',
    description: 'We embrace simplicity in design, creating versatile pieces that transcend seasonal trends and become wardrobe essentials.'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    image: IMAGES.lookbook[0]
  },
  {
    name: 'Marcus Wright',
    role: 'Head of Design',
    image: IMAGES.lookbook[1]
  },
  {
    name: 'Elena Santos',
    role: 'Sustainability Lead',
    image: IMAGES.lookbook[2]
  }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-light to-primary-white dark:from-primary-dark dark:to-[#333333]">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Creating timeless pieces for the modern minimalist since 2018.
            </p>
          </ScrollSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Our <span className="text-gradient">Values</span>
            </h2>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <ScrollSection
                key={value.title}
                animation="reveal"
                direction="up"
                delay={index * 0.1}
              >
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary-light dark:bg-primary-dark">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Meet the <span className="text-gradient">Team</span>
            </h2>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <ScrollSection
                key={member.name}
                animation="reveal"
                direction="up"
                delay={index * 0.1}
              >
                <div className="text-center space-y-4">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <ScrollSection animation="reveal" direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Have questions about our products or brand? We'd love to hear from you.
              </p>
              <a 
                href="mailto:contact@minimal.com"
                className="inline-block px-8 py-3 bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
              >
                Contact Us
              </a>
            </div>
          </ScrollSection>
        </div>
      </section>
    </main>
  )
}
