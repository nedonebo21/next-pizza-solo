import { CartDTO } from '../model/types'
import { CreateCartItemValues } from '../model/types'
import { ApiRoutes, axiosInstance } from '@/shared/services'

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(`${ApiRoutes.CART}/${id}`, { quantity })).data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${id}`)).data
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>(ApiRoutes.CART, values)).data
}
