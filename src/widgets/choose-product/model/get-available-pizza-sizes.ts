import { pizzaSizes } from '@/entities/product'

import type { PizzaType } from '@/entities/product'
import type { Variant } from '@/shared/ui'
import type { ProductVariant } from '@prisma/client'


export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
  const filteredPizzasByType = variants.filter(item => item.pizzaType === type)

  return pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
  }))
}
