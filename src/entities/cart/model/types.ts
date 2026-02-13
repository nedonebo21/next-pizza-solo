import { Cart, CartItem, Ingredient, Product, ProductVariant } from '@prisma/client'

export type CartStateItem = {
  id: number
  quantity: number
  name: string
  imageUrl: string
  price: number
  disabled?: boolean
  pizzaSize?: number | null
  pizzaType?: number | null
  ingredients: Array<{ name: string; price: number }>
}

export type CartState = {
  loading: boolean
  error: boolean
  totalAmount: number
  items: CartStateItem[]
  fetchCartItems: () => Promise<void>
  updateItemQuantity: (id: number, quantity: number) => Promise<void>
  addCartItem: (values: any) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
}

export type CartItemDTO = CartItem & {
  productVariant: ProductVariant & {
    product: Product
  }
  ingredients: Ingredient[]
}

export type CartDTO = Cart & {
  items: CartItemDTO[]
}

export type CreateCartItemValues = {
  productVariantId: number
  ingredients?: number[]
}
