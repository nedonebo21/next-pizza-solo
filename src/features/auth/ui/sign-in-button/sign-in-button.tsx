import { User } from 'lucide-react'
import { signIn } from 'next-auth/react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

type Props = {
  loginWith?: 'github' | 'google'
  onClick?: () => void
  isSignIn?: boolean
  className?: string
}

export const SignInButton = ({ loginWith, onClick, isSignIn, className }: Props) => {
  const isGitHub = loginWith === 'github'

  const isGoogle = loginWith === 'google'

  const handleClick = () => {
    onClick?.()

    if (isSignIn) {
      signIn(loginWith, {
        callbackUrl: '/',
        redirect: true,
      })
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={cn('flex items-start gap-2', className)}
      variant={'outline'}
    >
      {isGitHub && (
        <>
          <img
            className="w-6 h-6"
            src="https://github.githubassets.com/favicons/favicon.svg"
            alt={'gitLogo'}
          />
          GitHub
        </>
      )}
      {isGoogle && (
        <>
          <img
            className="w-6 h-6"
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt={'googleLogo'}
          />
          Google
        </>
      )}
      {!isGoogle && !isGitHub && (
        <>
          <User /> Войти
        </>
      )}
    </Button>
  )
}
