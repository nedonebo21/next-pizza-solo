'use server'

import { hashSync } from 'bcrypt'

import { sendEmail } from '@/shared/lib'
import { UserVerification } from '@/shared/ui'

import { prisma } from '../../../../prisma/prisma-client'

import type { Prisma } from '@prisma/client'

export const registerUser = async (body: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена')
      }

      throw new Error('Пользователь уже существует')
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    })

    await sendEmail(
      createdUser.email,
      'Next Pizza | Подтверждение регистрации',
      UserVerification({ code })
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}
