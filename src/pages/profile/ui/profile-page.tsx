import { getUserSession } from '@/entities/user'
import { redirect } from 'next/navigation'

export const ProfilePage = async () => {
  const session = await getUserSession()

  if (!session) {
    return redirect('/not-auth')
  }
  return <div>Profile</div>
}
