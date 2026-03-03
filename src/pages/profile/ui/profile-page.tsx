import { redirect } from 'next/navigation'

import { getUserSession } from '@/entities/user'
import { EditProfile } from '@/features/edit-profile'

import { prisma } from '../../../../prisma/prisma-client'

export const ProfilePage = async () => {
  const session = await getUserSession()

  if (!session) {
    return redirect('/not-auth')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  })

  if (!user) {
    return redirect('/not-auth')
  }

  return <EditProfile user={user} />
}
