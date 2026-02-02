import { CartItemDTO } from '@/shared/services/cart/cart.dto'

export const calcCartItemPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

  return (ingredientsPrice + item.productVariant.price) * item.quantity
}
