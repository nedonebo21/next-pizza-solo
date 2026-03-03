import { cn } from '@/shared/lib/utils'
import { Typography } from '@/shared/ui'

import type { ComponentProps, ReactNode } from 'react'

type CardProps = {
  title?: string
  endAdornment?: ReactNode
  children: ReactNode
  contentClassName?: string
} & Omit<ComponentProps<'div'>, 'children'>

export const Card = ({ children, title, className, contentClassName, endAdornment }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className={'flex items-center justify-between p-5 px-7 border-b border-gray-100'}>
          <Typography textAlign={'left'} variant={'bodyBold'} as={'h4'}>
            {title}
          </Typography>
          {endAdornment}
        </div>
      )}
      <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
    </div>
  )
}
