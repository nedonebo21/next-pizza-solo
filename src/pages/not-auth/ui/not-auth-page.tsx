import { ArrowLeft } from 'lucide-react'
import { Button, Typography } from '@/shared/ui'
import Link from 'next/link'

export const NotAuthPage = () => {
  return (
    <div className={'flex flex-col items-center justify-center mt-40'}>
      <div className={'flex items-center justify-between w-[840px] gap-12'}>
        <div className="flex flex-col justify-center items-center mx-auto">
          <div className="w-[445px]">
            <Typography variant={'title'} as={'h1'}>
              Доступ запрещен
            </Typography>
            <Typography variant={'subtitle'} className={'text-gray-400'}>
              Страница доступна только авторизованным пользователям
            </Typography>
          </div>

          <div className="mt-11 mx-auto">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
