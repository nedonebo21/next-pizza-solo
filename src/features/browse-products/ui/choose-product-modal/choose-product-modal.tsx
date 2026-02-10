'use client'

import { Dialog, DialogContent } from '@/shared/ui/shadcn/dialog'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { ProductWithRelations } from '@/entities/product'
import { ProductForm } from '@/features/browse-products'

type ChooseProductProps = {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: ChooseProductProps) => {
  const router = useRouter()
  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1065px] min-h-[550px] bg-white overflow-hidden',
          className
        )}
      >
        <ProductForm product={product} onSubmit={router.back} />
      </DialogContent>
    </Dialog>
  )
}
