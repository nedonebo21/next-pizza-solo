import { CartStateItem } from '../types'
import { CartDTO } from '@/shared/services/cart/cart.dto'
import { calcCartItemPrice } from './calc-cart-item-price'

type ReturnProps = {
  items: CartStateItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    imageUrl: item.productVariant.product.imageUrl,
    price: calcCartItemPrice(item),
    pizzaSize: item.productVariant.size,
    pizzaType: item.productVariant.pizzaType,
    ingredients: item.ingredients.map(ingredient => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }))

  return {
    items,
    totalAmount: data.totalAmount,
  }
}
