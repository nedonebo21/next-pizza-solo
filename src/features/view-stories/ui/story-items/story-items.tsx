import { IStory } from '@/features/view-stories/model/types'
import { XIcon } from 'lucide-react'
import ReactInstaStories from 'react-insta-stories'

type StoryItemsProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedStory?: IStory
}
export const StoryItems = ({ isOpen, setIsOpen, selectedStory }: StoryItemsProps) => {
  return (
    isOpen && (
      <div
        className={
          'absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'
        }
      >
        <div className={'relative'} style={{ width: 520 }}>
          <button className={'absolute -right-10 -top-5 z-30'} onClick={() => setIsOpen(false)}>
            <XIcon className={'absolute top-0 right-0 w-8 h-8 text-white/50'} />
          </button>
          <ReactInstaStories
            stories={selectedStory?.items.map(item => ({ url: item.sourceUrl })) || []}
            onAllStoriesEnd={() => setIsOpen(false)}
            defaultInterval={3000}
            width={520}
            height={800}
          />
        </div>
      </div>
    )
  )
}
