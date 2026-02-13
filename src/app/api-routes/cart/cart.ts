import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'
import { getOrCreateCart, updateCartTotalAmount } from '@/entities/cart'
import { CreateCartItemValues } from '@/entities/cart'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Cannot get cart' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await getOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValues

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
          some: {},
        },
      },
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map(id => ({ id })) },
        },
      })
    }

    const updatedUserCart = await updateCartTotalAmount(token)

    const res = NextResponse.json(updatedUserCart)
    res.cookies.set('cartToken', token)
    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Cannot create cart' }, { status: 500 })
  }
}
