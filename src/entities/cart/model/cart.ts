import { create } from 'zustand'

import * as cartApi from '../api/cart-api'

import { getCartDetails } from './lib/get-cart-details'

import type { CartState, CreateCartItemValues } from './types'

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await cartApi.getCart()

      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map(item => (item.id === id ? { ...item, disabled: true } : item)),
      }))
      const data = await cartApi.updateItemQuantity(id, quantity)

      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await cartApi.addCartItem(values)

      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map(item => (item.id === id ? { ...item, disabled: true } : item)),
      }))
      const data = await cartApi.removeCartItem(id)

      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map(item => (item.id === id ? { ...item, disabled: false } : item)),
      }))
    }
  },
}))
