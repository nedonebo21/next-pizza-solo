import { Separator } from '@radix-ui/react-select'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'

import Logo from '@/shared/assets/images/logo.png'
import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/ui/container'
import { Button } from '@/shared/ui/shadcn/button'

import type { ComponentProps } from 'react'
import { Typography } from '@/shared/ui/typography'

type HeaderProps = Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header className={cn('border border-b', className)} {...rest}>
      <Container className={'flex items-center justify-between py-10'}>
        <div className={'flex items-center gap-4'}>
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
        </div>

        <div className={'flex items-center gap-4'}>
          <Button className={'flex items-start gap-2'} variant={'outline'}>
            <User /> Войти
          </Button>
          <div>
            <Button className={'group relative flex items-center'}>
              <Typography variant={'bodyBold'}>520 ₽</Typography>
              <Separator className={'h-full w-[1px] bg-white/30 mx-3'} />
              <div
                className={'flex items-center gap-2 transition duration-300 group-hover:opacity-0'}
              >
                <ShoppingCart size={16} />
                <Typography variant={'bodyBold'}>3</Typography>
              </div>
              <ArrowRight
                size={20}
                className={
                  'w-5 absolute right-7 transition duration-300 -translate-x-2  opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                }
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
