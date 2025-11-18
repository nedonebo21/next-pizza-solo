import { cn } from '@/shared/lib/utils'

import type { ComponentProps } from 'react'

type HeaderProps = Omit<ComponentProps<'header'>, ''>

export const Header = ({ className, children, ...rest }: HeaderProps) => {
  return (
    <header className={cn('border border-b', className)} {...rest}>
      <div className={'mx-auto max-w-[1200px]'}>{children}</div>
    </header>
  )
}
