'use client'

import { Dialog, DialogContent } from '@/shared/ui/shadcn/dialog'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { ProductWithRelations } from '@/entities/product'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'
import { useCartStore } from '@/entities/cart'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'

type ChooseProductProps = {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: ChooseProductProps) => {
  const router = useRouter()
  const firstItem = product.variants[0]

  const [addCartItem, loading] = useCartStore(
    useShallow(state => [state.addCartItem, state.loading])
  )

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariantId ?? firstItem.id

      await addCartItem({
        productVariantId: itemId,
        ingredients,
      })

      toast.success(`${product.name} добавлен в корзину`)
      router.back()
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`)
      console.error(error)
    }
  }

  const isPizza = !!firstItem.pizzaType

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1065px] min-h-[550px] bg-white overflow-hidden',
          className
        )}
      >
        {isPizza ? (
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
        )}
      </DialogContent>
    </Dialog>
  )
}
