import { useEffect } from 'react'
import qs from 'qs'
import { Filters } from '@/features/products/model/types'
import { useRouter } from 'next/navigation'

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()

  useEffect(() => {
    const params = {
      ...filters.priceRange,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    }

    const query = qs.stringify(params, { arrayFormat: 'comma' })
    router.push(`?${query}`, { scroll: false })
  }, [filters.priceRange, filters.pizzaTypes, filters.sizes, filters.selectedIngredients, router])
}
