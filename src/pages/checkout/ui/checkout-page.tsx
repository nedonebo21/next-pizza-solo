'use client'

import { Card, Container, Typography, Textarea, Input } from '@/shared/ui'
import { useCart } from '@/entities/cart'
import { CheckoutSidebar } from './checkout-sidebar'
import { CheckoutItems } from './checkout-items'

export const CheckoutPage = () => {
  const { totalAmount, updateItemQuantity, removeCartItem, items, loading } = useCart()

  const handleQuantityUpdate = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Container className={'mt-10 p-0'}>
      <Typography textAlign={'left'} variant={'title'} as={'h2'} className={'mb-8'}>
        Оформление заказа
      </Typography>

      <div className={'flex gap-10'}>
        <div className={'flex flex-col gap-10 flex-1 mb-20'}>
          <Card title={'1. Корзина'}>
            <CheckoutItems
              items={items}
              onItemRemove={removeCartItem}
              onQuantityUpdate={handleQuantityUpdate}
            />
          </Card>
          <Card title={'1. Персональные данные'}>
            <div className={'grid grid-cols-2 gap-5'}>
              <Input name={'firstName'} className={'text-base'} placeholder={'Имя'} />
              <Input name={'lastName'} className={'text-base'} placeholder={'Фамилия'} />
              <Input name={'email'} className={'text-base'} placeholder={'E-Mail'} />
              <Input name={'phone'} className={'text-base'} placeholder={'Телефон'} />
            </div>
          </Card>
          <Card title={'1. Адрес доставки'}>
            <div className={'flex flex-col gap-5'}>
              <Input name={'address'} className={'text-base'} placeholder={'Введите адрес...'} />
              <Textarea className={'text-base'} placeholder={'Комментарий к заказу'} rows={5} />
            </div>
          </Card>
        </div>
        <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
      </div>
    </Container>
  )
}
