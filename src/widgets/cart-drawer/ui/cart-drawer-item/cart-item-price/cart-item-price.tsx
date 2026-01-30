import { Typography } from '@/shared/ui'

type CartItemPriceProps = {
  value: number
  className?: string
}

export const CartItemPrice = ({ className, value }: CartItemPriceProps) => {
  return (
    <Typography variant={'bodyBold'} as={'h2'} className={className}>
      {value} ₽
    </Typography>
  )
}
