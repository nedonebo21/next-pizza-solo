import { calcCartItemPrice } from './calc-cart-item-price'

import type { CartDTO, CartStateItem } from '@/entities/cart/model/types'

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
    disabled: false,
    ingredients: item.ingredients.map(ingredient => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[]

  return {
    items,
    totalAmount: data.totalAmount,
  }
}
