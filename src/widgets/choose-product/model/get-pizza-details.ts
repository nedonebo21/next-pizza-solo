import { calcTotalPizzaPrice } from '@/widgets/choose-product/model/calc-total-pizza-price'
import { mapPizzaType, PizzaSize, PizzaType } from '@/entities/product'
import { Ingredient, ProductVariant } from '@prisma/client'

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredients)
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`

  return { totalPrice, textDetails }
}
