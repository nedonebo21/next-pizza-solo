import { IStory } from '@/features/view-stories/model/types'
import { ApiRoutes, axiosInstance } from '@/shared/api'

export const getStories = async () => {
  return (await axiosInstance.get<IStory[]>(ApiRoutes.STORIES)).data
}
