'use client'

import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { FeaturedCollection } from '@/components/sections/FeaturedCollection'
import { Lookbook } from '@/components/sections/Lookbook'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Home() {
  // Initialize GSAP ScrollTrigger
  useScrollAnimation()

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <FeaturedCollection />
      <Lookbook />
    </main>
  )
}