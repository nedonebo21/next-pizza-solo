import { Container } from '@/shared/ui/container'
import { Typography } from '@/shared/ui/typography'
import { TopBar } from '@/widgets/top-bar'
import { ProductFilters } from '@/features/product-filters'

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
            <div className={'flex-col gap-12'}></div>
          </div>
        </div>
      </Container>
    </>
  )
}
