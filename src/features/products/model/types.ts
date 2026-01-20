export type PriceRange = {
  min?: number
  max?: number
}

export type Filters = {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  priceRange: PriceRange
}
