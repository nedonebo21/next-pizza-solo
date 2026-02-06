import { cn } from '@/shared/lib/utils'
import type { CartItemProps } from '@/entities/cart'
import { CartItemImage } from './cart-item-image'
import { CartItemInfo } from './cart-item-info'
import { CartItemPrice } from './cart-item-price'
import { CountButton } from '@/shared/ui'
import { Trash2Icon } from 'lucide-react'

type CartDrawerItemProps = CartItemProps & {
  className?: string
  onQuantityUpdate: (type: 'plus' | 'minus') => void
  onItemRemove: () => void
}

export const CartDrawerItem = ({
  className,
  id,
  name,
  price,
  quantity,
  details,
  imageUrl,
  onQuantityUpdate,
  onItemRemove,
}: CartDrawerItemProps) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <CartItemImage src={imageUrl} />

      <div className={'flex-1'}>
        <CartItemInfo name={name} details={details} />

        <hr className={'my-3'} />

        <div className={'flex items-center justify-between'}>
          <CountButton value={quantity} onClick={onQuantityUpdate} />

          <div className={'flex items-center gap-3'}>
            <CartItemPrice value={price} />
            <Trash2Icon
              onClick={onItemRemove}
              className={'text-gray-400 cursor-pointer hover:text-gray-600'}
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
