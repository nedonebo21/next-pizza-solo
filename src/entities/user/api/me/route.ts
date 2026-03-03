'use server'

import { getUserSession } from '@/entities/user'
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function GET() {
  try {
    const user = await getUserSession()
    if (!user) {
      return NextResponse.json({ error: 'Вы не авторизованы' }, { status: 401 })
    }

    const data = await prisma.user.findFirst({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
  }
}
