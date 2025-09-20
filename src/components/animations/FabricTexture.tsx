'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IMAGES } from '@/constants/images'

const textures = [
  { name: 'Cotton', image: IMAGES.fabrics.cotton },
  { name: 'Denim', image: IMAGES.fabrics.denim },
  { name: 'Linen', image: IMAGES.fabrics.linen }
]

export function FabricTexture() {
  const [currentTexture, setCurrentTexture] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTexture((prev) => (prev + 1) % textures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        key={currentTexture}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 rounded-2xl overflow-hidden"
      >
        <div className="w-full h-full relative">
          <Image
            src={textures[currentTexture].image}
            alt={`${textures[currentTexture].name} fabric texture`}
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <motion.div
          className="absolute bottom-6 left-6 text-primary-dark text-2xl font-light"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {textures[currentTexture].name}
        </motion.div>
      </motion.div>
    </div>
  )
}
