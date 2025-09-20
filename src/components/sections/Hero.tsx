'use client'

import { motion } from 'framer-motion'
import { Scene } from '../3d/Scene'
import { ScrollSection } from '../animations/ScrollSection'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-primary-light to-primary-white dark:from-primary-dark dark:to-[#333333]">
      {/* Brand Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-40"
      >
        <Link href="/">
          <span className="text-xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
            MINIMAL
          </span>
        </Link>
      </motion.div>

      <div className="container-custom h-full">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <ScrollSection animation="reveal" direction="left">
            <div className="z-10">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="text-gradient">Minimalism</span>
                <br />
                in Motion
              </h1>
              <ScrollSection animation="fade" delay={0.2}>
                <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
                  Discover our collection of timeless pieces designed for the modern minimalist.
                </p>
              </ScrollSection>
              <ScrollSection animation="scale" delay={0.4}>
                <Link href="/collection">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300"
                  >
                    Explore Collection
                  </motion.button>
                </Link>
              </ScrollSection>
            </div>
          </ScrollSection>

          {/* 3D Model */}
          <ScrollSection animation="slide" direction="right" delay={0.2}>
            <div className="h-[600px] w-full">
              <Scene />
            </div>
          </ScrollSection>
        </div>

        {/* Scroll Indicator */}
        <ScrollSection animation="fade" delay={0.8}>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Scroll to Explore</span>
              <motion.svg 
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </div>
          </div>
        </ScrollSection>
      </div>
    </section>
  )
}