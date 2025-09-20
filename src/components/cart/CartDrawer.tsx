'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart()
  const router = useRouter()

  const handleQuantityChange = (id: string, size: string, color: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } })
    }
  }

  const handleRemoveItem = (id: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } })
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white dark:bg-gray-900 shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <AnimatePresence>
                            {state.items.length === 0 ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12"
                              >
                                <p className="text-gray-500 dark:text-gray-400">
                                  Your cart is empty
                                </p>
                              </motion.div>
                            ) : (
                              <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                {state.items.map((item) => (
                                  <motion.li
                                    key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex py-6"
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                                        [Product Image]
                                      </div>
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium">
                                          <h3>{item.name}</h3>
                                          <p className="ml-4">${item.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                          {item.selectedColor.name} | {item.selectedSize}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() => handleQuantityChange(item.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                                            className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800"
                                          >
                                            -
                                          </button>
                                          <span>{item.quantity}</span>
                                          <button
                                            onClick={() => handleQuantityChange(item.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                                            className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800"
                                          >
                                            +
                                          </button>
                                        </div>

                                        <button
                                          type="button"
                                          onClick={() => handleRemoveItem(item.id, item.selectedSize, item.selectedColor.name)}
                                          className="font-medium text-primary-dark dark:text-primary-light hover:opacity-75"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </motion.li>
                                ))}
                              </ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {state.items.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium">
                          <p>Subtotal</p>
                          <p>${state.total.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark py-3 px-4 rounded-full text-base font-medium shadow-sm hover:opacity-90 transition-colors duration-300"
                            onClick={() => {
                              onClose()
                              router.push('/checkout')
                            }}
                          >
                            Checkout
                          </motion.button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <button
                            type="button"
                            className="font-medium hover:opacity-75"
                            onClick={onClose}
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
