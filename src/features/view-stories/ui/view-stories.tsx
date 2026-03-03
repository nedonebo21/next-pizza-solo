'use client'

import { useEffect, useState } from 'react'
import { IStory } from '../model/types'
import { getStories } from '../api/get-stories'
import { Container, StoriesSkeleton } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { Stories } from '@/features/view-stories/ui/stories/stories'
import { StoryItems } from '@/features/view-stories/ui/story-items/story-items'

type ViewStoriesProps = {
  className?: string
}
export const ViewStories = ({ className }: ViewStoriesProps) => {
  const [stories, setStories] = useState<IStory[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState<IStory>()

  useEffect(() => {
    async function fetchStories() {
      const data = await getStories()
      setStories(data)
    }
    fetchStories()
  }, [])

  const handleStoryOpen = (story: IStory) => {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
        <StoriesSkeleton stories={stories} />
        <Stories stories={stories} onStoryOpen={handleStoryOpen} />
        <StoryItems isOpen={isOpen} setIsOpen={setIsOpen} selectedStory={selectedStory} />
      </Container>
    </>
  )
}
