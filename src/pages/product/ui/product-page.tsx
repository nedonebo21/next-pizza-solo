import { prisma } from '../../../../prisma/prisma-client'
import { notFound } from 'next/navigation'
import { Container, GroupVariants, ProductImage, Typography } from '@/shared/ui'
import { pizzaSizes } from '@/entities/product'

export const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className={'flex flex-col my-10'}>
      <div className={'flex flex-1'}>
        <ProductImage imageUrl={product.imageUrl} size={40} />

        <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
          <Typography className={'mb-1'} textAlign={'left'} variant={'title'} as={'h2'}>
            {product.name}
          </Typography>
          <Typography
            textAlign={'left'}
            className={'text-sm text-gray-400 font-normal'}
            variant={'bodySemiBold'}
          >
            Lorem ipsum dolor sit amet, consectetur
          </Typography>

          <GroupVariants items={pizzaSizes} />
        </div>
      </div>
    </Container>
  )
}
