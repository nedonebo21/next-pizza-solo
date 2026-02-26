import { Dialog, DialogContent } from '@/shared/ui'
import { SignInButton } from '@/features/auth'

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const handleClose = () => {
    onClose()
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={'w-[450px] bg-white p-10'}>
        FORM
        <hr />
        <div className={'flex gap-2'}>
          <SignInButton className={'h-12 p-2 flex-1 items-center'} loginWith={'github'} isSignIn />
          <SignInButton className={'h-12 p-2 flex-1 items-center'} loginWith={'google'} isSignIn />
        </div>
      </DialogContent>
    </Dialog>
  )
}
