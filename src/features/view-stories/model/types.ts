import { Story, StoryItem } from '.prisma/client'

export type IStory = {
  items: StoryItem[]
} & Story
