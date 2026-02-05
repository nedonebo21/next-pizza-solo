import { axiosInstance } from '@/shared/services/instance'
import { CartDTO } from './cart.dto'

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/cart')).data
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(`/cart/${id}`, { quantity })).data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(`/cart/${id}`)
  return data
}
