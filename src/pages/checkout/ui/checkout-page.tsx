'use client'

import { Container, Typography } from '@/shared/ui'
import { useCart } from '@/entities/cart'
import { CheckoutSidebar } from './checkout-sidebar'
import { CheckoutItems } from './checkout-items'
import { CheckoutAddressForm, CheckoutForm, CheckoutPersonalForm } from '@/features/checkout'
import { CheckoutFormValues } from '@/features/checkout'
import { SubmitHandler } from 'react-hook-form'
import { cn } from '@/shared/lib/utils'
import { createOrder } from '../../../../app/actions'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const CheckoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { totalAmount, updateItemQuantity, removeCartItem, items, loading } = useCart()

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data, e) => {
    try {
      setIsSubmitting(true)
      const url = await createOrder(data)
      toast.success('Заказ успешно создан! Переход на страницу оплаты')
      if (url) {
        location.href = url
      }
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
      toast.error('Ошибка при создании заказа')
    }
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
          <CheckoutSidebar
            totalAmount={totalAmount}
            isLoading={loading}
            isSubmitting={isSubmitting}
          />
        </div>
      </CheckoutForm>
    </Container>
  )
}
