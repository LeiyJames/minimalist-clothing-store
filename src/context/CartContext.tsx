'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product } from '@/types/product'

interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: { name: string; value: string }
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const initialState: CartState = {
  items: [],
  total: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Create a unique identifier for cart items including variations
      const getItemKey = (item: CartItem) => 
        `${item.id}-${item.selectedSize}-${item.selectedColor.name}`
      
      const existingItemIndex = state.items.findIndex(
        (item) => getItemKey(item) === getItemKey(action.payload)
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        }
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        }
      }

      const updatedItems = [...state.items, { ...action.payload }]
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }

    case 'REMOVE_ITEM': {
      const getItemKey = (item: CartItem) => 
        `${item.id}-${item.selectedSize}-${item.selectedColor.name}`
      
      const targetKey = `${action.payload.id}-${action.payload.size}-${action.payload.color}`
      const updatedItems = state.items.filter((item) => getItemKey(item) !== targetKey)
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }

    case 'UPDATE_QUANTITY': {
      const getItemKey = (item: CartItem) => 
        `${item.id}-${item.selectedSize}-${item.selectedColor.name}`
      
      const targetKey = `${action.payload.id}-${action.payload.size}-${action.payload.color}`
      const updatedItems = state.items.map((item) =>
        getItemKey(item) === targetKey
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0) // Remove items with 0 quantity
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
