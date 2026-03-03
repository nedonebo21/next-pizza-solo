import { ApiRoutes, axiosInstance } from '@/shared/api'

import type { Ingredient } from '@prisma/client'

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data
}
