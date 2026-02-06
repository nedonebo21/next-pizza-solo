'use client'

import { Typography } from '@/shared/ui'
import { Separator } from '@radix-ui/react-select'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/ui/shadcn/button'
import { cn } from '@/shared/lib/utils'
import { CartDrawer } from './cart-drawer'
import { useCartStore } from '@/entities/cart'
import { useShallow } from 'zustand/shallow'

type CartButtonProps = {
  className?: string
}

export const CartButton = ({ className }: CartButtonProps) => {
  const [items, totalAmount, loading] = useCartStore(
    useShallow(state => [state.items, state.totalAmount, state.loading])
  )
  return (
    <CartDrawer>
      <Button
        isLoading={loading}
        className={cn('group relative flex items-center', { 'w-[105px]': loading }, className)}
      >
        <Typography variant={'bodyBold'}>{totalAmount} ₽</Typography>
        <Separator className={'h-full w-[1px] bg-white/30 mx-3'} />
        <div className={'flex items-center gap-2 transition duration-300 group-hover:opacity-0'}>
          <ShoppingCart size={16} />
          <Typography variant={'bodyBold'}>{items.length}</Typography>
        </div>
        <ArrowRight
          size={20}
          className={
            'w-5 absolute right-7 transition duration-300 -translate-x-2  opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
          }
        />
      </Button>
    </CartDrawer>
  )
}
