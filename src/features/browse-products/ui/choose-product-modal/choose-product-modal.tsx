'use client'

import { Dialog, DialogContent } from '@/shared/ui/shadcn/dialog'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { ProductWithRelations } from '@/entities/product'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

type ChooseProductProps = {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: ChooseProductProps) => {
  const router = useRouter()

  const isPizza = !!product?.variants[0]?.pizzaType
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
          />
        ) : (
          <ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
        )}
      </DialogContent>
    </Dialog>
  )
}
