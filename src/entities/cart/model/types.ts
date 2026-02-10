export type CartItemProps = {
  id: number
  imageUrl: string
  name: string
  price: number
  quantity: number
  details: string
  disabled?: boolean
}

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
