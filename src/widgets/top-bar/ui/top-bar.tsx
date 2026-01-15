import { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/ui/container'
import { CategoryFilter } from '@/features/category'
import { SortPopup } from '@/shared/ui/sort-popup'

type TopBarProps = Omit<ComponentProps<'div'>, 'children'>

export const TopBar = ({ className, ...rest }: TopBarProps) => {
  return (
    <div
      className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5', className)}
      {...rest}
    >
      <Container className={'flex items-center justify-between'}>
        <CategoryFilter />
        <SortPopup />
      </Container>
    </div>
  )
}
