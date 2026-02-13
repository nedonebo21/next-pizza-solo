import { cn } from '@/shared/lib/utils'
import { CartItemImage, CartItemInfo, CartItemPrice, CartItemProps, CountButton } from '@/shared/ui'
import { XIcon } from 'lucide-react'

type Props = CartItemProps & {
  className?: string
  onItemRemove: () => void
  onQuantityUpdate: (type: 'plus' | 'minus') => void
}
export const CheckoutItem = ({
  className,
  name,
  price,
  quantity,
  details,
  imageUrl,
  onQuantityUpdate,
  onItemRemove,
  disabled,
}: Props) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className={'flex items-center gap-5 flex-1'}>
        <CartItemImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>
      <CartItemPrice value={price} />
      <div className={'flex items-center gap-5 ml-20'}>
        <CountButton value={quantity} onClick={onQuantityUpdate} />
        <button onClick={onItemRemove} disabled={disabled}>
          <XIcon className={'text-gray-400 cursor-pointer hover:text-gray-600'} size={20} />
        </button>
      </div>
    </div>
  )
}
