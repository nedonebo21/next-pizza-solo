'use server'


import { hashSync } from 'bcrypt'

import { getUserSession } from '@/entities/user'

import { prisma } from '../../../../prisma/prisma-client'

import type { Prisma } from '@prisma/client'

export const updateUser = async (body: Prisma.UserUpdateInput) => {
  try {
    const currentUser = await getUserSession()

    if (!currentUser) {
      throw new Error('Пользователь не найден')
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
