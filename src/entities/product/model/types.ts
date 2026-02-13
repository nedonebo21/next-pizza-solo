import { Ingredient, Product, ProductVariant } from '@prisma/client'
import { mapPizzaSize, mapPizzaType } from './consts'

export type ProductWithRelations = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
