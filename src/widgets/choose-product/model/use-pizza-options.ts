'use client'

import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

import { getAvailablePizzaSizes } from '@/widgets/choose-product/model'

import type { PizzaSize, PizzaType } from '@/entities/product'
import type { Variant } from '@/shared/ui'
import type { ProductVariant } from '@prisma/client'

type ReturnProps = {
  size: PizzaSize
  type: PizzaType
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  selectedIngredients: Set<number>
  addIngredient: (id: number) => void
  availableSizes: Variant[]
  currentItemId?: number
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20)

  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

  const availableSizes = getAvailablePizzaSizes(type, variants)

  const currentItemId = variants.find(item => item.pizzaType === type && item.size === size)?.id

  useEffect(() => {
    const hasAvailableSize = availableSizes?.find(
      item => Number(item.value) === size && !item.disabled
    )

    const availableSize = availableSizes?.find(item => !item.disabled)

    if (!hasAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type, size])

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    availableSizes,
    addIngredient,
    currentItemId,
  }
}
