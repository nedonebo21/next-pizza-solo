import { ApiRoutes, axiosInstance } from '@/shared/api'
import { User } from '@prisma/client'

export const getMe = async () => {
  return (await axiosInstance.get<User>(ApiRoutes.ME)).data
}
