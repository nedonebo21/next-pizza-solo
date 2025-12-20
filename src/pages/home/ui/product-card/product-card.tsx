import Link from 'next/link'
import { Typography } from '@/shared/ui'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui/shadcn/button'

type Props = {
  id: number
  name: string
  price: number
  imageUrl: string
}

export const ProductCard = ({ imageUrl, id, name, price }: Props) => {
  return (
    <div>
      <Link href={`/product/${id}`}>
        <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
          <img className={'w-[215px] h-[215px]'} src={imageUrl} alt={name} />
        </div>
        <Typography textAlign={'left'} variant={'title'}>
          {name}
        </Typography>
        <Typography
          textAlign={'left'}
          className={'text-sm text-gray-400 font-normal'}
          variant={'bodySemiBold'}
        >
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
        </Typography>
        <div className={'flex justify-between items-center mt-4'}>
          <div className={'flex gap-1'}>
            <Typography className={'font-normal'} variant={'price'}>
              от
            </Typography>
            <Typography variant={'price'}>{price} ₽</Typography>
          </div>

          <Button variant={'secondary'}>
            <Plus size={20} className={'mr-1'} />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
