'use client'

import toast from 'react-hot-toast'

import { useCart } from '@/entities/cart'


import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

import type { ProductWithRelations } from '@/entities/product'

type ProductFormProps = {
  product: ProductWithRelations
  onSubmit?: () => void
}

export const ProductForm = ({ product, onSubmit: _onSubmit }: ProductFormProps) => {
  const { addCartItem, loading } = useCart()

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariantId ?? firstItem.id

      await addCartItem({
        productVariantId: itemId,
        ingredients,
      })

      toast.success(`${product.name} добавлен в корзину`)
      _onSubmit?.()
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`)
      console.error(error)
    }
  }

  const firstItem = product.variants[0]

  const isPizza = !!firstItem.pizzaType

  return isPizza ? (
    <ChoosePizzaForm
      name={product.name}
      imageUrl={product.imageUrl}
      ingredients={product.ingredients}
      variants={product.variants}
      onSubmit={onSubmit}
      isLoading={loading}
    />
  ) : (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      price={firstItem.price}
      onSubmit={onSubmit}
      isLoading={loading}
    />
  )
}
