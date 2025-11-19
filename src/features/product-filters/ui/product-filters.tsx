import { ComponentProps } from 'react'
import { Typography } from '@/shared/ui/typography'
import { Checkbox } from '@/shared/ui/shadcn/checkbox'

type ProductFiltersProps = Omit<ComponentProps<'div'>, 'children'>
export const ProductFilters = ({ className, ...rest }: ProductFiltersProps) => {
  return (
    <div className={className} {...rest}>
      <Typography variant={'subtitle'}>Фильтрация</Typography>
      <div>
        <Checkbox title={'Можно собирать'} />
        <Checkbox title={'Новинки'} />
      </div>
    </div>
  )
}
