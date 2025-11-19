import { ComponentProps } from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { cn } from '@/shared/lib/utils'

type CategoryFilterProps = {
  categories: string[]
} & Omit<ComponentProps<'div'>, 'children'>

export const CategoryFilter = ({ className, categories, ...rest }: CategoryFilterProps) => {
  const activeIndex = 0
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 rounded-2xl', className)} {...rest}>
      {categories.map((category, index) => {
        return (
          <a key={category} className={'flex items-center h-11 rounded-2xl px-5'}>
            <Button
              className={cn(
                activeIndex === index
                  ? 'bg-white text-primary shadow-md shadow-gray-200'
                  : 'bg-gray-50 shadow-none'
              )}
              variant={'secondary'}
            >
              {category}
            </Button>
          </a>
        )
      })}
    </div>
  )
}
