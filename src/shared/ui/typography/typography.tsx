import { cn } from '@/shared/lib/utils'

import type { ComponentProps, ElementType, ReactNode } from 'react'

const variantMapping = {
  title: 'text-4xl font-extrabold leading-tight',
  subtitle: 'text-[22px] font-bold leading-tight',
  bodyNormal: 'text-base font-normal leading-tight',
  bodySemiBold: 'text-[15px] font-semibold leading-tight',
  bodyBold: 'text-base font-bold leading-tight',
  price: 'text-xl font-bold leading-tight',
  error: 'text-red-600 text-sm',
  warning: 'text-yellow-600 text-sm',
}

type TypographyOwnProps<T extends ElementType = ElementType> = {
  as?: T
  children: ReactNode
  noWrap?: boolean
  variant?: keyof typeof variantMapping
  textAlign?: 'left' | 'center' | 'right' | 'justify'
}

export type TypographyProps<T extends ElementType> = TypographyOwnProps<T> &
  Omit<ComponentProps<T>, keyof TypographyOwnProps>

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  variant = 'bodyNormal',
  noWrap,
  textAlign = 'center',
  ...rest
}: TypographyProps<T>) => {
  const classes = cn(
    variantMapping[variant],
    textAlign === 'center' && 'text-center',
    textAlign === 'left' && 'text-left',
    textAlign === 'right' && 'text-right',
    textAlign === 'justify' && 'text-justify',
    noWrap && 'whitespace-nowrap',
    className
  )

  const componentTag = variantMapping[variant] ?? 'p'

  const Component = as ?? componentTag

  return <Component className={classes} {...rest} />
}
