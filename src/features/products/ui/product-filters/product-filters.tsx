'use client'

import { ComponentProps } from 'react'
import { Typography, RangeSlider, CheckboxFilterGroup, FilterCheckbox } from '@/shared/ui'
import { Input } from '@/shared/ui/shadcn/input'
import { useIngredientsFilter } from '@/shared/lib/hooks/use-ingredients-filter'

type ProductFiltersProps = Omit<ComponentProps<'div'>, 'children'>

export const ProductFilters = ({ className, ...rest }: ProductFiltersProps) => {
  const { ingredients, isLoading } = useIngredientsFilter()

  const items = ingredients.map(item => ({ value: String(item.id), label: item.name }))

  return (
    <div className={className} {...rest}>
      <Typography className={'mb-7'} variant={'subtitle'} textAlign={'left'}>
        Фильтрация
      </Typography>
      <div className={'flex flex-col gap-4'}>
        <FilterCheckbox label={'Можно собирать'} value={'1'} />
        <FilterCheckbox label={'Новинки'} value={'2'} />
      </div>
      <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
        <Typography variant={'bodyBold'} textAlign={'left'}>
          Цена от и до:
        </Typography>
        <div className={'flex gap-4 mb-7'}>
          <Input type={'number'} placeholder={'0'} min={0} max={1000} defaultValue={0} />
          <Input type={'number'} placeholder={'1000'} min={100} max={1000} />
        </div>
        <RangeSlider step={10} min={100} max={1000} />
      </div>
      <CheckboxFilterGroup title={'Ингредиенты'} items={items} isLoading={isLoading} />
    </div>
  )
}
