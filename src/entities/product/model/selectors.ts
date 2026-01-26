import { mapPizzaSize, mapPizzaType } from '@/entities/product/model/consts'

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}))

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value,
}))

export const pizzaTypesItems = pizzaTypes.map(type => ({
  value: String(type.value),
  label: type.name,
}))

export const pizzaSizesItems = pizzaSizes.map(size => ({
  value: String(size.value),
  label: size.name,
}))
