'use client'

import { ScrollSection } from '../animations/ScrollSection'
import { FabricTexture } from '../animations/FabricTexture'

export function About() {
  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <ScrollSection animation="reveal" direction="left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Crafted with
                <br />
                <span className="text-gradient">Purpose & Precision</span>
              </h2>
            </ScrollSection>
            
            <div className="space-y-6">
              <ScrollSection animation="fade" delay={0.2}>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Every piece in our collection is thoughtfully designed with a focus on 
                  minimalist aesthetics and sustainable materials.
                </p>
              </ScrollSection>
              
              <ScrollSection animation="fade" delay={0.3}>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We believe in creating timeless garments that transcend seasonal trends, 
                  reducing waste while maximizing versatility.
                </p>
              </ScrollSection>
              
              <ScrollSection animation="fade" delay={0.4}>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our commitment to quality craftsmanship ensures that each item 
                  becomes a lasting addition to your wardrobe.
                </p>
              </ScrollSection>
            </div>

            <ScrollSection animation="scale" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold">100%</span>
                  <span className="text-sm">Sustainable Materials</span>
                </div>
                <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold">5+</span>
                  <span className="text-sm">Years of Excellence</span>
                </div>
              </div>
            </ScrollSection>
          </div>

          {/* Fabric Texture Animation */}
          <ScrollSection animation="slide" direction="right" delay={0.2}>
            <div className="h-[600px] w-full">
              <FabricTexture />
            </div>
          </ScrollSection>
        </div>
      </div>
    </section>
  )
}