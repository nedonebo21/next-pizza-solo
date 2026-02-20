'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Typography,
  Button,
} from '@/shared/ui'
import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CartDrawerItem } from '@/shared/ui'
import { getCartItemDetails, useCart } from '@/entities/cart'
import { PizzaSize, PizzaType } from '@/entities/product'
import Image from 'next/image'
import { cn } from '@/shared/lib/utils'
import { ApiRoutes } from '@/shared/api'

type CartDrawerProps = {
  children: ReactNode
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart()

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const itemsCount = items.length
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={'flex flex-col justify-between pb-0 bg-[#f4f1ee]'}>
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине&nbsp;
                <Typography variant={'bodyBold'} as={'span'}>
                  {itemsCount} товара
                </Typography>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className={'flex flex-col items-center justify-center w-72 mx-auto'}>
              <Image
                src={'https://cdn.dodostatic.net/pizza-site/dist/assets/5aa5dac99a832c62f3ef..svg'}
                alt="Empty Cart"
                width={120}
                height={120}
              />
              <Typography variant={'subtitle'} as={'h4'} textAlign={'center'} className={'my-2'}>
                Корзина пустая
              </Typography>
              <Typography
                variant={'bodyNormal'}
                textAlign={'center'}
                className={'text-neutral-500 mb-5'}
              >
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </Typography>

              <SheetClose>
                <Button className={'w-56 h-12 text-base'} size={'lg'}>
                  <ArrowLeft className={'w-5 mr-2'} />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className={'-mx-6 mt-5 overflow-auto scrollbar flex-1 gap-2'}>
                {items.map(item => (
                  <div className={'mb-2'} key={item.id}>
                    <CartDrawerItem
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
                      onQuantityUpdate={type => handleQuantityUpdate(item.id, item.quantity, type)}
                      onItemRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
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

                  <Link href={ApiRoutes.CHECKOUT}>
                    <Button
                      className={'w-full h-12 text-base'}
                      type={'submit'}
                      disabled={loading}
                      isLoading={loading}
                    >
                      Оформить заказ
                      <ArrowRight className={'w-5 ml-2'} />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
