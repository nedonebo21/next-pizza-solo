'use client'

import { Typography } from '@/shared/ui'
import { ProductCard } from './product-card/product-card'
import { RefObject, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

type Props = {
  title: string
  items: any[]
  className?: string
  categoryId: number
}

export const ProductsGroupList = ({ items, title, categoryId, className }: Props) => {
  const intersectionRef = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(title, categoryId)
    }
  }, [categoryId, intersection?.isIntersecting, title])

  return (
    <div ref={intersectionRef} id={title} className={className}>
      <Typography textAlign={'left'} className={'mb-5'} variant={'title'}>
        {title}
      </Typography>
      <div className={'grid grid-cols-3 gap-[50px]'}>
        {items.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
