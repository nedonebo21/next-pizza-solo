'use client'

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/shadcn/sheet'
import { ReactNode } from 'react'
import { Typography } from '@/shared/ui'
import Link from 'next/link'
import { Button } from '@/shared/ui/shadcn/button'
import { ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/features/manage-cart'

type CartDrawerProps = {
  className?: string
  children: ReactNode
}

export const CartDrawer = ({ className, children }: CartDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={'flex flex-col justify-between pb-0 bg-[#f4f1ee]'}>
        <SheetHeader>
          <SheetTitle>
            В корзине&nbsp;
            <Typography variant={'bodyBold'} as={'span'}>
              3 товара
            </Typography>
          </SheetTitle>
        </SheetHeader>

        <div className={'-mx-6 mt-5 overflow-auto scrollbar flex-1 gap-2'}>
          <div className={'mb-2'}>
            <CartDrawerItem
              id={1}
              imageUrl={
                'https://media.dodostatic.net/image/r:584x584/019bcbc9b40370a4b47c6298dcac292a.avif'
              }
              name={'Чоризо фреш'}
              price={500}
              quantity={1}
              details={getCartItemDetails(2, 30, [])}
            />
          </div>
        </div>

        <SheetFooter className={'-mx-6 bg-white p-8'}>
          <div className={'w-full'}>
            <div className={'flex mb-4'}>
              <span className={'flex-1 text-lg text-neutral-500'}>
                Итого
                <div
                  className={
                    'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'
                  }
                />
              </span>
              <span className={'font-bold text-lg'}>500 ₽</span>
            </div>

            <Link href={'/cart'}>
              <Button className={'w-full h-12 text-base'} type={'submit'}>
                Оформить заказ
                <ArrowRight className={'w-5 ml-2'} />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
