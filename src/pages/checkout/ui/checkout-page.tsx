'use client'

import { Container, Typography } from '@/shared/ui'
import { useCart } from '@/entities/cart'
import { CheckoutSidebar } from './checkout-sidebar'
import { CheckoutItems } from './checkout-items'
import { CheckoutAddressForm, CheckoutForm, CheckoutPersonalForm } from '@/features/checkout'
import { CheckoutFormValues } from '@/features/checkout'
import { SubmitHandler } from 'react-hook-form'
import { cn } from '@/shared/lib/utils'

export const CheckoutPage = () => {
  const { totalAmount, updateItemQuantity, removeCartItem, items, loading } = useCart()

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data, e) => {
    console.log({ data, e })
  }

  return (
    <Container className={'mt-10 p-0'}>
      <Typography textAlign={'left'} variant={'title'} as={'h2'} className={'mb-8'}>
        Оформление заказа
      </Typography>

      <CheckoutForm onSubmit={onSubmit}>
        <div className={'flex gap-10'}>
          <div className={'flex flex-col gap-10 flex-1 mb-20'}>
            <CheckoutItems
              items={items}
              onItemRemove={removeCartItem}
              onQuantityUpdate={handleQuantityUpdate}
              isLoading={loading}
            />
            <CheckoutPersonalForm className={cn({ 'opacity-40 pointer-events-none': loading })} />
            <CheckoutAddressForm className={cn({ 'opacity-40 pointer-events-none': loading })} />
          </div>
          <CheckoutSidebar totalAmount={totalAmount} isLoading={loading} />
        </div>
      </CheckoutForm>
    </Container>
  )
}
