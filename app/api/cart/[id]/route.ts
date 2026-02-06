import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'
import { updateCartTotalAmount } from '@/entities/cart'

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const id = Number(params.id)

    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: 'Invalid cart item id' }, { status: 400 })
    }

    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: '[CART_PATCH] Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const id = Number(params.id)
    const token = req.cookies.get('cartToken')?.value

    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: 'Invalid cart item id' }, { status: 400 })
    }

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Cannot delete item from cart' }, { status: 500 })
  }
}
