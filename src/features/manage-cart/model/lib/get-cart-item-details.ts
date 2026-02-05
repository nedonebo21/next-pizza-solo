import { mapPizzaType, PizzaSize, PizzaType } from '@/entities/product'
import { CartStateItem } from '@/features/manage-cart/model/types'

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: CartStateItem['ingredients']
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType]
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map(ingredient => ingredient.name))
  }

  return details.join(', ')
}
