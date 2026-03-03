'use client'

import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import { useCartStore } from '../cart'

import type { CartStateItem } from '../types'
import type { CreateCartItemValues } from '@/entities/cart'

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
  addCartItem: (values: CreateCartItemValues) => Promise<void>
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(useShallow(state => state))

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}
