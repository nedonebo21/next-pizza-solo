import { User } from 'lucide-react'
import Image from 'next/image'

import Logo from '@/shared/assets/images/logo.png'
import { cn } from '@/shared/lib/utils'

import type { ComponentProps } from 'react'
import { Typography, Container, Button } from '@/shared/ui'
import Link from 'next/link'
import { SearchProducts } from '@/features/browse-products'
import { CartButton } from '@/widgets/cart-drawer'

type HeaderProps = {
  hasSearch?: boolean
  hasCart?: boolean
} & Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, hasSearch = true, hasCart = true, ...rest }: HeaderProps) => {
  return (
    <header className={cn('border-b', className)} {...rest}>
      <Container className={'flex items-center justify-between py-10'}>
        <Link href={'/'} className={'flex items-center gap-4'}>
          <Image src={Logo} alt={'logo'} />
          <div className={'flex flex-col gap-1'}>
            <Typography
              variant={'title'}
              as={'h1'}
              textAlign={'left'}
              className={'font-black uppercase'}
            >
              Next Pizza
            </Typography>
            <Typography
              variant={'bodyNormal'}
              as={'p'}
              textAlign={'left'}
              className={'text-gray-400 leading-3'}
            >
              by nedonebo21
            </Typography>
          </div>
        </Link>

        {hasSearch && (
          <div className={'mx-10 flex-1'}>
            <SearchProducts />
          </div>
        )}

        <div className={'flex items-center gap-4'}>
          <Button className={'flex items-start gap-2'} variant={'outline'}>
            <User /> Войти
          </Button>
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
