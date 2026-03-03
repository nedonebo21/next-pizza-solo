import { cn } from '@/shared/lib/utils'
import { Typography, CountIconButton } from '@/shared/ui'

import type { CountIconButtonProps } from '@/shared/ui/count-icon-button'

type CountButtonProps = {
  value?: number
  size?: CountIconButtonProps['size']
  onClick?: (type: 'plus' | 'minus') => void
  className?: string
}

export const CountButton = ({ className, onClick, value, size }: CountButtonProps) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <Typography className={size === 'sm' ? 'text-sm' : 'text-md'} as={'b'}>
        {value}
      </Typography>

      <CountIconButton onClick={() => onClick?.('plus')} size={size} type="plus" />
    </div>
  )
}
