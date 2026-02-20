import { Ingredient } from '@prisma/client'
import { ApiRoutes, axiosInstance } from '@/shared/api'

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data
}
