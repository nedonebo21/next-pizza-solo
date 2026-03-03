import { cn } from '@/shared/lib/utils'
import { Typography } from '@/shared/ui'

type CartItemInfoProps = {
  className?: string
  name: string
  details: string
}

export const CartItemInfo = ({ name, details, className }: CartItemInfoProps) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <Typography textAlign={'left'} className="text-lg font-bold flex-1 leading-6" as={'h2'}>
          {name}
        </Typography>
      </div>
      {details && (
        <Typography textAlign={'left'} className="text-xs text-gray-400 w-[90%]">
          {details}
        </Typography>
      )}
    </div>
  )
}
