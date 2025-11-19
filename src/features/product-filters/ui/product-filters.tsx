import { ComponentProps } from 'react'
import { Typography } from '@/shared/ui/typography'
import { FilterCheckbox } from '@/shared/ui/filter-checkbox'
import { Input } from '@/shared/ui/shadcn/input'
import { cn } from '@/shared/lib/utils'
import { RangeSlider } from '@/shared/ui/range-slider'
import { CheckboxFilterGroup } from '@/shared/ui/checkbox-filter-group'

type ProductFiltersProps = Omit<ComponentProps<'div'>, 'children'>

export const ProductFilters = ({ className, ...rest }: ProductFiltersProps) => {
  return (
    <div className={cn('max-w-[250px]', className)} {...rest}>
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
      <CheckboxFilterGroup
        title={'Ингредиенты'}
        items={[
          { label: 'Сырный соус', value: '1' },
          { label: 'Моцарелла', value: '2' },
          { label: 'Чеснок', value: '3' },
          { label: 'Солёные огурчики', value: '4' },
          { label: 'Красный лук', value: '5' },
          { label: 'Томаты', value: '6' },
          { label: 'Пепперони', value: '7' },
          { label: 'Грибы', value: '8' },
        ]}
      />
    </div>
  )
}
