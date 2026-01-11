'use client'

import { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'
import { useCategoryStore } from '@/features/category-filter'

type CategoryFilterProps = Omit<ComponentProps<'div'>, 'children'>

const cats = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктейли' },
  { id: 5, name: 'Кофе' },
  { id: 6, name: 'Напитки' },
  { id: 7, name: 'Десерты' },
]

export const CategoryFilter = ({ className, ...rest }: CategoryFilterProps) => {
  const activeCategoryId = useCategoryStore(state => state.activeId)
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 rounded-2xl', className)} {...rest}>
      {cats.map(({ name, id }, index) => {
        return (
          <a key={id} href={`/#${name}`} className={'flex items-center h-11 rounded-2xl px-5'}>
            <Button
              className={cn(
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
