'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ScrollSection } from '@/components/animations/ScrollSection'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/collection')
    }
    window.scrollTo(0, 0)
  }, [state.items.length, router])

  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              {/* Floating Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-full shadow-lg hover:shadow-xl"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="font-medium">Back</span>
                </button>
              </motion.div>

              <ScrollSection animation="reveal" direction="up">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                {/* Shipping Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6 mt-8">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <input type="radio" name="payment" id="card" className="h-4 w-4" />
                      <label htmlFor="card" className="flex-1">Credit Card</label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <input type="radio" name="payment" id="paypal" className="h-4 w-4" />
                      <label htmlFor="paypal" className="flex-1">PayPal</label>
                    </div>
                  </div>
                </div>
              </ScrollSection>
            </div>
          </div>

          {/* Order Summary */}
          <ScrollSection animation="reveal" direction="up" delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={item.images.main}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.selectedColor.name} | {item.selectedSize}
                      </p>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="font-medium">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 py-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-full font-medium hover:opacity-90 transition-opacity mt-6"
              >
                Place Order
              </motion.button>
            </div>
          </ScrollSection>
        </div>
      </div>
    </div>
  )
}