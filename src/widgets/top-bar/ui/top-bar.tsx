import { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { Container, SortPopup } from '@/shared/ui'
import { FilterCategory } from '@/features/filter-category'
import { Category } from '@prisma/client'

type TopBarProps = {
  categories: Category[]
} & Omit<ComponentProps<'div'>, 'children'>

export const TopBar = ({ className, categories, ...rest }: TopBarProps) => {
  return (
    <div
      className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5', className)}
      {...rest}
    >
      <Container className={'flex items-center justify-between'}>
        <FilterCategory categories={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
