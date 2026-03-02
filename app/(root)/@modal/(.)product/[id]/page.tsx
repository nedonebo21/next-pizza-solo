import { notFound } from 'next/navigation'

import { ChooseProductModal } from '@/widgets/choose-product'

import { prisma } from '../../../../../prisma/prisma-client'

export default async function ProductModal({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  const product = await prisma.product.findFirst({
    where: {
      id: Number(resolvedParams.id),
    },
    include: {
      ingredients: true,
      variants: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return <ChooseProductModal product={product} />
}
