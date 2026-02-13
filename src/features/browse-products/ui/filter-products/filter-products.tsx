'use client'

import { ComponentProps } from 'react'
import { Input, Typography, RangeSlider, CheckboxFilterGroup } from '@/shared/ui'
import { PRICE_MAX, PRICE_MIN, PRICE_STEP } from '@/features/browse-products/model/constants'
import { useIngredients, useFilters, useQueryFilters } from '@/features/browse-products/model/hooks'
import { pizzaSizesItems, pizzaTypesItems } from '@/entities/product'

type ProductFiltersProps = Omit<ComponentProps<'div'>, 'children'>

export const FilterProducts = ({ className, ...rest }: ProductFiltersProps) => {
  const { ingredients, isLoading } = useIngredients()
  const filters = useFilters()
  useQueryFilters(filters)

  const items = ingredients.map(item => ({ value: String(item.id), label: item.name }))

  const updatePrices = (prices: number[]) => {
    filters.setPriceRange('min', prices[0])
    filters.setPriceRange('max', prices[1])
  }

  return (
    <div className={className} {...rest}>
      <Typography className={'mb-5'} variant={'subtitle'} textAlign={'left'}>
        Фильтрация
      </Typography>

      <CheckboxFilterGroup
        className={'mb-5'}
        title={'Тип теста'}
        items={pizzaTypesItems}
        onCheckboxClick={filters.setPizzaTypes}
        selectedItems={filters.pizzaTypes}
      />

      <CheckboxFilterGroup
        className={'mb-5'}
        title={'Размеры'}
        items={pizzaSizesItems}
        onCheckboxClick={filters.setSizes}
        selectedItems={filters.sizes}
      />

      <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
        <Typography className={'mb-3.5'} variant={'bodyBold'} textAlign={'left'}>
          Цена от и до:
        </Typography>
        <div className={'flex gap-4 mb-7'}>
          <Input
            type={'number'}
            onChange={e => filters.setPriceRange('min', Number(e.target.value))}
            placeholder={`${PRICE_MIN}`}
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={String(filters.priceRange.min)}
          />
          <Input
            type={'number'}
            onChange={e => filters.setPriceRange('max', Number(e.target.value))}
            placeholder={`${PRICE_MAX}`}
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={String(filters.priceRange.max)}
          />
        </div>
        <RangeSlider
          step={PRICE_STEP}
          min={PRICE_MIN}
          max={PRICE_MAX}
          values={[filters.priceRange.min ?? PRICE_MIN, filters.priceRange.max ?? PRICE_MAX]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFilterGroup
        className={'mt-5'}
        title={'Ингредиенты'}
        onCheckboxClick={filters.setSelectedIngredients}
        selectedItems={filters.selectedIngredients}
        items={items}
        isLoading={isLoading}
      />
    </div>
  )
}
