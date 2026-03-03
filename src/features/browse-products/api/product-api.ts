import { ApiRoutes, axiosInstance } from '@/shared/api'

import type { Product } from '@prisma/client'

export const search = async (query: string): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data
}
