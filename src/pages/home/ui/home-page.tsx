import { Container, Typography } from '@/shared/ui'
import { TopBar } from '@/widgets/top-bar'
import { FilterProducts } from '@/features/browse-products'
import { ProductsGroupList } from './products-group-list'
import { prisma } from '../../../../prisma/prisma-client'
import { Suspense } from 'react'

export const Home = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true,
        },
      },
    },
  })

  return (
    <>
      <Container className={'mt-10'}>
        <Typography variant={'title'} as={'h1'} textAlign={'left'}>
          Все пиццы
        </Typography>
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Container className={'mt-9 pb-14'}>
        <div className={'flex gap-15'}>
          <div className={'w-[250px]'}>
            <Suspense>
              <FilterProducts />
            </Suspense>
          </div>
          <div className={'flex-1'}>
            <div className={'flex flex-col gap-12'}>
              {categories.map(
                category =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
