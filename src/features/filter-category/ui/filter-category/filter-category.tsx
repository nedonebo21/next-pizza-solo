'use client'

import { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'
import { useCategoryStore } from '@/features/filter-category'
import { Category } from '@prisma/client'

type CategoryFilterProps = {
  categories: Category[]
} & Omit<ComponentProps<'div'>, 'children'>

export const FilterCategory = ({ className, categories, ...rest }: CategoryFilterProps) => {
  const activeCategoryId = useCategoryStore(state => state.activeId)
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 rounded-2xl', className)} {...rest}>
      {categories.map(({ name, id }, index) => {
        return (
          <a key={id} href={`/#${name}`} className={'flex items-center h-11 rounded-2xl px-3'}>
            <Button
              className={cn(
                'rounded-2xl',
                activeCategoryId === index + 1
                  ? 'bg-white text-primary shadow-md shadow-gray-200'
                  : 'bg-gray-50 shadow-none'
              )}
              variant={'secondary'}
            >
              {name}
            </Button>
          </a>
        )
      })}
    </div>
  )
}
