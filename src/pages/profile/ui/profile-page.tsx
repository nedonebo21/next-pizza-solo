import { getUserSession } from '@/entities/user'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../prisma/prisma-client'
import { EditProfile } from '@/features/edit-profile'

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
