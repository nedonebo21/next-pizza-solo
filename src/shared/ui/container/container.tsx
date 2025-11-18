import { cn } from '@/shared/lib/utils'

import type { ReactNode } from 'react'

type ContainerProps = {
  className?: string
  children: ReactNode
}

export const Container = ({ className, children }: ContainerProps) => {
  return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>
}
