import { Container, Typography } from '@/shared/ui'
import { TopBar } from '@/widgets/top-bar'
import { ProductFilters } from '@/features/products'
import { ProductsGroupList } from '@/pages/home/ui/products-group-list/products-group-list'

export const Home = () => {
  return (
    <>
      <Container className={'mt-10'}>
        <Typography variant={'title'} as={'h1'} textAlign={'left'}>
          Все пиццы
        </Typography>
      </Container>
      <TopBar />
      <Container className={'mt-9 pb-14'}>
        <div className={'flex gap-15'}>
          <div className={'w-[250px]'}>
            <ProductFilters />
          </div>
          <div className={'flex-1'}>
            <div className={'flex flex-col gap-12'}>
              <ProductsGroupList
                title={'Пиццы'}
                items={[
                  {
                    id: 1,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title={'Комбо'}
                items={[
                  {
                    id: 2,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Диабло',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198bf439a007604880d0231be87cd3e.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
