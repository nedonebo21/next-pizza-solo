import type { CartStateItem } from '@/entities/cart'
import { getCartItemDetails } from '@/entities/cart'
import { CheckoutItem } from './checkout-item'
import { PizzaSize, PizzaType } from '@/entities/product'
import { Card, CheckoutItemSkeleton } from '@/shared/ui'

type CheckoutItemsProps = {
  items: CartStateItem[]
  onItemRemove: (id: number) => void
  onQuantityUpdate: (id: number, quantity: number, type: 'plus' | 'minus') => void
  isLoading?: boolean
}
export const CheckoutItems = ({
  items,
  onItemRemove,
  onQuantityUpdate,
  isLoading,
}: CheckoutItemsProps) => {
  const handleItemRemove = (id: number) => {
    onItemRemove(id)
  }

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    onQuantityUpdate(id, quantity, type)
  }

  return (
    <Card title={'1. Корзина'}>
      <div className={'flex flex-col gap-5'}>
        {isLoading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}

        {!isLoading &&
          items.map(item => (
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
    </Card>
  )
}
