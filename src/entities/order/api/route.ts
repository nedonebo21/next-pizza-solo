import { NextRequest, NextResponse } from 'next/server'
import { OrderSuccess, PaymentCallbackData } from '@/features/checkout'
import { prisma } from '../../../../prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { CartItemDTO } from '@/entities/cart'
import { sendEmail } from '@/shared/lib'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' })
    }

    const isSucceeded = body.object.status === 'succeeded'

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    })

    const items = order.items as unknown as CartItemDTO[]

    const emailHtml = OrderSuccess({
      orderId: order.id,
      products: items,
    })

    if (isSucceeded) {
      await sendEmail(order.email, `NextPizza | Заказ #${order.id} успешно оплачен`, emailHtml)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
