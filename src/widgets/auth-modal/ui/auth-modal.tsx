import { useState } from 'react'

import { LoginForm, RegisterForm, SignInButton } from '@/features/auth'
import { Button, Dialog, DialogContent } from '@/shared/ui'

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [formType, setFormType] = useState<'login' | 'register'>('login')

  const handleSwitchType = () => {
    setFormType(formType === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={'w-[450px] bg-white p-10'}>
        {formType === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className={'flex gap-2'}>
          <SignInButton className={'h-12 p-2 flex-1 items-center'} loginWith={'github'} isSignIn />
          <SignInButton className={'h-12 p-2 flex-1 items-center'} loginWith={'google'} isSignIn />
        </div>
        <Button variant={'outline'} onClick={handleSwitchType} className={'h-12'} type={'button'}>
          {formType !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
