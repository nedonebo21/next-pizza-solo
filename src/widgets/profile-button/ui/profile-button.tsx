import { useSession } from 'next-auth/react'
import { SignInButton } from '@/features/auth'
import Link from 'next/link'
import { Button } from '@/shared/ui'
import { CircleUser } from 'lucide-react'

type ProfileButtonProps = {
  className?: string
  onClick?: () => void
}
export const ProfileButton = ({ className, onClick }: ProfileButtonProps) => {
  const { data: session } = useSession()
  const isAuth = !!session
  return (
    <div className={className}>
      {!isAuth ? (
        <SignInButton onClick={onClick} />
      ) : (
        <Link href={'/profile'}>
          <Button variant={'outline'} className={'flex items-center gap-2'}>
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  )
}
