import { Skeleton } from '@/shared/ui'
import { IStory } from '@/features/view-stories/model/types'

type StoriesSkeletonProps = {
  stories: IStory[]
}
export const StoriesSkeleton = ({ stories }: StoriesSkeletonProps) => {
  return (
    stories.length === 0 &&
    [...Array(6)].map((_, index) => (
      <Skeleton key={index} className={'w-[200px] h-[250px] rounded-md'} />
    ))
  )
}
