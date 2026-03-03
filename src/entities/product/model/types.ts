import type { mapPizzaSize, mapPizzaType } from './consts'
import type { Ingredient, Product, ProductVariant } from '@prisma/client'

export type ProductWithRelations = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
