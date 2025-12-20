import { Container, Typography } from '@/shared/ui'
import { TopBar } from '@/widgets/top-bar'
import { ProductFilters } from '@/features/product-filters'
import { ProductCard } from '@/pages/home/ui/product-card/product-card'

export const Home = () => {
  return (
    <>
      <Container className={'mt-10'}>
        <Typography variant={'title'} as={'h1'} textAlign={'left'}>
          Все пиццы
        </Typography>
      </Container>
      <TopBar categories={['Все', 'Мясные', 'Острые', 'Сладкие', 'Вегетарианская', 'С курицей']} />
      <Container className={'mt-9 pb-14'}>
        <div className={'flex gap-15'}>
          <div className={'w-[250px]'}>
            <ProductFilters />
          </div>
          <div className={'flex-1'}>
            <div className={'flex-col gap-12'}>
              <ProductCard
                id={0}
                name={'Диабло'}
                price={550}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif'
                }
              />
              <ProductCard
                id={0}
                name={'Диабло'}
                price={550}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif'
                }
              />
              <ProductCard
                id={0}
                name={'Диабло'}
                price={550}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif'
                }
              />
              <ProductCard
                id={0}
                name={'Диабло'}
                price={550}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif'
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
