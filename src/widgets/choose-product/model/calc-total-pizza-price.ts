import type { PizzaSize, PizzaType } from '@/entities/product'
import type { Ingredient, ProductVariant } from '@prisma/client'

/**
 * Функция для вычисления стоимости пиццы
 *
 * @example ```calcTotalPizzaPrice(1, 20, variants, ingredients, selectedIngredients)```
 *
 * @param type - тип пиццы(теста)
 * @param size - размер пиццы
 * @param variants - список вариаций
 * @param ingredients - список ингредиенты
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns - общую стоимость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    variants.find(variant => variant.pizzaType === type && variant.size === size)?.price ?? 0

  const ingredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + ingredientsPrice
}
