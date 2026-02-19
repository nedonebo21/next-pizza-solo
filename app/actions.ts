'use server'

import { CheckoutFormValues } from '@/features/checkout'
import { prisma } from '../prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'
import { sendEmail } from '@/shared/lib'
import { PayOrder } from '@/shared/ui'

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies()
    const cartToken = cookieStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error('Cart token not found')
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })

    if (!userCart) {
      throw new Error('Cart not found')
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
      },
    })

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    //TODO создание ссылки для оплаты
    // здесь

    const emailHtml = PayOrder({
      orderId: order.id,
      totalPrice: order.totalAmount,
      paymentUrl: 'https://google.com',
    })

    await sendEmail(data.email, `NextPizza | Оплата заказа ${order.id}`, emailHtml)

    return 'https://google.com'
  } catch (error) {
    console.error(error)
  }
}
