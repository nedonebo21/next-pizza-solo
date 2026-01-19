'use client'

import { ComponentProps } from 'react'
import { useState, useEffect } from 'react'
import { Typography, RangeSlider, CheckboxFilterGroup, FilterCheckbox } from '@/shared/ui'
import { Input } from '@/shared/ui/shadcn/input'
import { useIngredientsFilter } from '@/shared/lib/hooks/use-ingredients-filter'
import { PRICE_MAX, PRICE_MIN, PRICE_STEP } from '@/features/products/model/constants'
import { useSet } from 'react-use'
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'

type ProductFiltersProps = Omit<ComponentProps<'div'>, 'children'>

type PriceRange = {
  min?: number
  max?: number
}

export const ProductFilters = ({ className, ...rest }: ProductFiltersProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { ingredients, isLoading, selectedIngredients, onToggleId } = useIngredientsFilter(
    searchParams?.get('ingredients')?.split(',') || []
  )
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams?.get('sizes')?.split(',') || [])
  )
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams?.get('pizzaTypes')?.split(',') || [])
  )

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: Number(searchParams?.get('min')) || PRICE_MIN,
    max: Number(searchParams?.get('max')) || PRICE_MAX,
  })

  const items = ingredients.map(item => ({ value: String(item.id), label: item.name }))

  const handlePriceChange = (name: keyof PriceRange, value: number) => {
    setPriceRange(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const filters = {
      ...priceRange,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    }

    const query = qs.stringify(filters, { arrayFormat: 'comma' })
    router.push(`?${query}`, { scroll: false })
  }, [priceRange, pizzaTypes, sizes, selectedIngredients, router])

  return (
    <div className={className} {...rest}>
      <Typography className={'mb-7'} variant={'subtitle'} textAlign={'left'}>
        Фильтрация
      </Typography>
      <div className={'flex flex-col gap-4'}>
        <FilterCheckbox label={'Можно собирать'} value={'1'} />
        <FilterCheckbox label={'Новинки'} value={'2'} />
      </div>

      <CheckboxFilterGroup
        title={'Тип теста'}
        items={[
          { label: 'Тонкое', value: '1' },
          { label: 'Традиционное', value: '2' },
        ]}
        onCheckboxClick={togglePizzaTypes}
        selectedItems={pizzaTypes}
      />

      <CheckboxFilterGroup
        title={'Размеры'}
        items={[
          { label: '20см', value: '20' },
          { label: '30см', value: '30' },
          { label: '40см', value: '40' },
        ]}
        onCheckboxClick={toggleSizes}
        selectedItems={sizes}
      />

      <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
        <Typography className={'mb-3.5'} variant={'bodyBold'} textAlign={'left'}>
          Цена от и до:
        </Typography>
        <div className={'flex gap-4 mb-7'}>
          <Input
            type={'number'}
            onChange={e => handlePriceChange('min', Number(e.target.value))}
            placeholder={`${PRICE_MIN}`}
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={String(priceRange.min)}
          />
          <Input
            type={'number'}
            onChange={e => handlePriceChange('max', Number(e.target.value))}
            placeholder={`${PRICE_MAX}`}
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={String(priceRange.max)}
          />
        </div>
        <RangeSlider
          step={PRICE_STEP}
          min={PRICE_MIN}
          max={PRICE_MAX}
          values={[priceRange.min ?? PRICE_MIN, priceRange.max ?? PRICE_MAX]}
          onValueChange={([min, max]) => setPriceRange({ min, max })}
        />
      </div>
      <CheckboxFilterGroup
        title={'Ингредиенты'}
        onCheckboxClick={onToggleId}
        selectedItems={selectedIngredients}
        items={items}
        isLoading={isLoading}
      />
    </div>
  )
}
