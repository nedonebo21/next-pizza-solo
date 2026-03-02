'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useClickAway, useDebounce } from 'react-use'

import { cn } from '@/shared/lib/utils'
import { Typography } from '@/shared/ui'

import * as productApi from '../../api/product-api'

import type { Product } from '@prisma/client'
import type { ChangeEvent, ComponentProps } from 'react'

type SearchInputProps = Omit<ComponentProps<'input'>, 'children'>

export const SearchProducts = ({ className, ...rest }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const [focused, setFocused] = useState(false)

  const [products, setProducts] = useState<Product[]>([])

  const ref = useRef(null)

  const handleFocusOn = () => {
    setFocused(true)
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(
    async () => {
      try {
        const res = await productApi.search(searchQuery)

        setProducts(res)
      } catch (e) {
        console.error(e)
      }
    },
    500,
    [searchQuery]
  )

  const handleClickItem = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }

  const hasProducts = products.length > 0

  return (
    <>
      {focused && <div className={'fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'} />}

      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}
      >
        <Search className={'absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'} />
        <input
          className={'rounded-2xl outline-none w-full bg-gray-100 pl-11'}
          type={'text'}
          placeholder={'Найти пиццу'}
          onFocus={handleFocusOn}
          value={searchQuery}
          onChange={handleValueChange}
          {...rest}
        />

        {hasProducts && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products.map(product => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={'flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer'}
                onClick={handleClickItem}
              >
                <img className={'rounded-sm h-8'} src={product.imageUrl} alt={product.name} />
                <Typography variant={'bodyNormal'} as={'span'}>
                  {product.name}
                </Typography>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
