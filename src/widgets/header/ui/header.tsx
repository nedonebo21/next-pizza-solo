'use client'

import { cn } from '@/shared/lib/utils'

import { ComponentProps, useEffect, useState } from 'react'
import { Container } from '@/shared/ui'
import { SearchProducts } from '@/features/browse-products'
import { CartButton } from '@/widgets/cart-drawer'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProfileButton } from '@/widgets/profile-button/ui/profile-button'
import { HeaderLogo } from './header-logo'
import { AuthModal } from '@/widgets/auth-modal/ui/auth-modal'

type HeaderProps = {
  hasSearch?: boolean
  hasCart?: boolean
} & Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, hasSearch = true, hasCart = true, ...rest }: HeaderProps) => {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = () => {
    setIsOpen(!open)
  }

  useEffect(() => {
    if (searchParams?.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен!')
      }, 500)
    }
  }, [])

  return (
    <header className={cn('border-b', className)} {...rest}>
      <Container className={'flex items-center justify-between py-10'}>
        <HeaderLogo />

        {hasSearch && (
          <div className={'mx-10 flex-1'}>
            <SearchProducts />
          </div>
        )}

        <div className={'flex items-center gap-4'}>
          <AuthModal open={isOpen} onClose={handleOpenChange} />
          <ProfileButton onClick={() => setIsOpen(true)} />
          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
