import { cn } from '@/shared/lib/utils'

type CartItemImageProps = {
  className?: string
  src: string
}

export const CartItemImage = ({ className, src }: CartItemImageProps) => {
  return <img src={src} className={cn('w-[60px] h-[60px]', className)} alt={'Image'} />
}
