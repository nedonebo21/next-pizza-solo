'use client'

import { CreateCartItemValues } from '@/entities/cart'
import { useCartStore } from '../cart'
import { useShallow } from 'zustand/shallow'
import { useEffect } from 'react'
import { CartStateItem } from '../types'

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
