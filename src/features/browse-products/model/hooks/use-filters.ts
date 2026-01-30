import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import { useState } from 'react'
import { PRICE_MAX, PRICE_MIN } from '@/features/browse-products/model/constants'
import { Filters, PriceRange } from '@/features/browse-products/model/types'

type QueryFilters = PriceRange & {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

type ReturnProps = Filters & {
  setPriceRange: (name: keyof PriceRange, value: number) => void
  setPizzaTypes: (value: string) => void
  setSelectedIngredients: (value: string) => void
  setSizes: (value: string) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
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

  const handlePriceChange = (name: keyof PriceRange, value: number) => {
    setPriceRange(prev => ({ ...prev, [name]: value }))
  }

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    priceRange,
    setSizes: toggleSizes,
    setPizzaTypes: togglePizzaTypes,
    setPriceRange: handlePriceChange,
    setSelectedIngredients: toggleIngredients,
  }
}
