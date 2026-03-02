import { notFound } from 'next/navigation'

import { Container } from '@/shared/ui'
import { ProductForm } from '@/widgets/choose-product'

import { prisma } from '../../../../prisma/prisma-client'

export const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className={'flex flex-col my-10'}>
      <ProductForm product={product} />
    </Container>
  )
}
