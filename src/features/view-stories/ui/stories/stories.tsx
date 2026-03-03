import { IStory } from '@/features/view-stories/model/types'

type StoriesProps = {
  stories: IStory[]
  onStoryOpen: (story: IStory) => void
}
export const Stories = ({ stories, onStoryOpen }: StoriesProps) => {
  const handleStoryOpen = (story: IStory) => {
    onStoryOpen(story)
  }
  return stories.map(story => (
    <img
      key={story.id}
      onClick={() => handleStoryOpen(story)}
      className={'rounded-md cursor-pointer'}
      height={250}
      width={200}
      src={story.previewImageUrl}
      alt={'StoryImg'}
    />
  ))
}
