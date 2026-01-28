import { pizzaSizes, PizzaType } from '@/entities/product'
import { ProductVariant } from '@prisma/client'
import { Variant } from '@/shared/ui'

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
  const filteredPizzasByType = variants.filter(item => item.pizzaType === type)

  return pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
  }))
}
