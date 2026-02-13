import { Typography } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'

type CheckoutItemDetailsProps = {
  className?: string
  price: number
  title: string
  icon?: ReactNode
}
export const DeliveryDetails = ({ className, price, title, icon }: CheckoutItemDetailsProps) => {
  return (
    <div className={cn('flex my-4', className)}>
      <Typography
        className={'flex flex-1 text-lg text-neutral-500'}
        variant={'bodyNormal'}
        as={'span'}
      >
        <div className={'flex items-center'}>
          {icon}
          {title}
        </div>
        :
        <div
          className={'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'}
        />
      </Typography>
      <Typography className={'text-lg'} variant={'price'}>
        {price} ₽
      </Typography>
    </div>
  )
}
