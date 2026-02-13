import { CartStateItem } from '@/entities/cart/model/types'
import { CheckoutItem } from '@/pages/checkout/ui/checkout-items/checkout-item'
import { getCartItemDetails } from '@/entities/cart'
import { PizzaSize, PizzaType } from '@/entities/product'

type CheckoutItemsProps = {
  items: CartStateItem[]
  onItemRemove: (id: number) => void
  onQuantityUpdate: (id: number, quantity: number, type: 'plus' | 'minus') => void
}
export const CheckoutItems = ({ items, onItemRemove, onQuantityUpdate }: CheckoutItemsProps) => {
  const handleItemRemove = (id: number) => {
    onItemRemove(id)
  }

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    onQuantityUpdate(id, quantity, type)
  }

  return (
    <div className={'flex flex-col gap-5'}>
      {items.map(item => (
        <CheckoutItem
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          details={getCartItemDetails(
            item.ingredients,
            item.pizzaType as PizzaType,
            item.pizzaSize as PizzaSize
          )}
          disabled={item.disabled}
          onItemRemove={() => handleItemRemove(item.id)}
          onQuantityUpdate={type => handleQuantityUpdate(item.id, item.quantity, type)}
        />
      ))}
    </div>
  )
}
