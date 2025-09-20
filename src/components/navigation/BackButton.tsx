'use client'

import { motion } from 'framer-motion'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export function BackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-6 left-6 z-40"
    >
      <Link href="/collection">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all duration-300"
        >
          <ArrowLongLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Collection</span>
        </motion.button>
      </Link>
    </motion.div>
  )
}
