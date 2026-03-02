import { CircleCheck } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Typography } from '@/shared/ui'

type IngredientProps = {
  className?: string
  imageUrl: string
  name: string
  price: number
  active?: boolean
  onClick?: () => void
}

export const IngredientItem = ({
  className,
  name,
  active,
  price,
  onClick,
  imageUrl,
}: IngredientProps) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className={'absolute top-2 right-2 text-primary'} />}
      <img width={110} height={110} src={imageUrl} alt={'Ingredient'} />
      <Typography className={'text-xs mb-1'} variant={'bodySemiBold'} as={'span'}>
        {name}
      </Typography>
      <Typography className={'font-bold'} variant={'bodySemiBold'} as={'span'}>
        {price} ₽
      </Typography>
    </div>
  )
}
