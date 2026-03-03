'use server'

import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'

import { createPayment } from '@/features/checkout'
import { sendEmail } from '@/shared/lib'
import { PayOrder } from '@/shared/ui'

import type { CheckoutFormValues } from '@/features/checkout'
import { prisma } from '../../../../prisma/prisma-client'

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

    const paymentData = await createPayment({
      amount: order.totalAmount,
      description: `Оплата заказа #${order.id}`,
      orderId: order.id,
    })

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    })

    const paymentUrl = paymentData.confirmation.confirmation_url

    const emailHtml = PayOrder({
      orderId: order.id,
      totalPrice: order.totalAmount,
      paymentUrl,
    })

    await sendEmail(data.email, `NextPizza | Оплата заказа ${order.id}`, emailHtml)

    return paymentUrl
  } catch (error) {
    console.error(error)
  }
}
