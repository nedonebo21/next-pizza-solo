import { Typography } from '@/shared/ui'

type CartItemInfoProps = {
  name: string
  details: string
}

export const CartItemInfo = ({ name, details }: CartItemInfoProps) => {
  return (
    <div>
      <div className={'flex items-center justify-between'}>
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
