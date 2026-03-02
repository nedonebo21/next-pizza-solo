'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { SearchProducts } from '@/features/browse-products'
import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/ui'
import { AuthModal } from '@/widgets/auth-modal/ui/auth-modal'
import { CartButton } from '@/widgets/cart-drawer'
import { ProfileButton } from '@/widgets/profile-button/ui/profile-button'

import { HeaderLogo } from './header-logo'

import type { ComponentProps } from 'react'

type HeaderProps = {
  hasSearch?: boolean
  hasCart?: boolean
} & Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, hasSearch = true, hasCart = true, ...rest }: HeaderProps) => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = () => {
    setIsOpen(!open)
  }

  useEffect(() => {
    let toastMessage = ''

    if (searchParams?.has('paid')) {
      toastMessage = 'Заказ успешно оплачен'
    }

    if (searchParams?.has('verified')) {
      toastMessage = 'Почта успешно подтверждена'
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/')
        toast.success(toastMessage, { duration: 3000 })
      }, 500)
    }
  }, [router, searchParams])

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
