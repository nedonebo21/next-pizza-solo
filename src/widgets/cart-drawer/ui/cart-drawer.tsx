'use client'

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/shadcn/sheet'
import { ReactNode, useEffect } from 'react'
import { Typography } from '@/shared/ui'
import Link from 'next/link'
import { Button } from '@/shared/ui/shadcn/button'
import { ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails, useCartStore } from '@/entities/cart'
import { PizzaSize, PizzaType } from '@/entities/product'
import { useShallow } from 'zustand/shallow'

type CartDrawerProps = {
  children: ReactNode
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const [totalAmount, items, fetchCartItems, updateQuantity, removeCartItem] = useCartStore(
    useShallow(state => [
      state.totalAmount,
      state.items,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.removeCartItem,
    ])
  )

  useEffect(() => {
    fetchCartItems()
  }, [])

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateQuantity(id, newQuantity)
  }

  const itemsCount = items.length

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={'flex flex-col justify-between pb-0 bg-[#f4f1ee]'}>
        <SheetHeader>
          <SheetTitle>
            В корзине&nbsp;
            <Typography variant={'bodyBold'} as={'span'}>
              {itemsCount} товара
            </Typography>
          </SheetTitle>
        </SheetHeader>

        <div className={'-mx-6 mt-5 overflow-auto scrollbar flex-1 gap-2'}>
          {items.map(item => {
            const isPizza = item.pizzaSize && item.pizzaType

            return (
              <div className={'mb-2'} key={item.id}>
                <CartDrawerItem
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  details={
                    isPizza
                      ? getCartItemDetails(
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                          item.ingredients
                        )
                      : ''
                  }
                  onQuantityUpdate={type => handleQuantityUpdate(item.id, item.quantity, type)}
                  onItemRemove={() => removeCartItem(item.id)}
                />
              </div>
            )
          })}
        </div>

        <SheetFooter className={'-mx-6 bg-white p-8'}>
          <div className={'w-full'}>
            <div className={'flex mb-4'}>
              <span className={'flex-1 text-lg text-neutral-500'}>
                Итого
                <div
                  className={
                    'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'
                  }
                />
              </span>
              <span className={'font-bold text-lg'}>{totalAmount} ₽</span>
            </div>

            <Link href={'/cart'}>
              <Button className={'w-full h-12 text-base'} type={'submit'}>
                Оформить заказ
                <ArrowRight className={'w-5 ml-2'} />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
