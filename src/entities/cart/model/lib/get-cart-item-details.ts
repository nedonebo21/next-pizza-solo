import { mapPizzaType, PizzaSize, PizzaType } from '@/entities/product'
import { CartStateItem } from '@/entities/cart/model/types'

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
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
