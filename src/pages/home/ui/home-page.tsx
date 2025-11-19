import { Button } from '@/shared/ui/shadcn/button'
import { Container } from '@/shared/ui/container'
import { Typography } from '@/shared/ui/typography'

export const Home = () => {
  return (
    <Container className={'mt-10'}>
      <Typography variant={'title'} as={'h1'} textAlign={'left'}>
        Все пиццы
      </Typography>
    </Container>
  )
}
