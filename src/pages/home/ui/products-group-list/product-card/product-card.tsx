import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button, Typography } from '@/shared/ui'
import { Ingredient } from '@prisma/client'

type Props = {
  id: number
  name: string
  price: number
  imageUrl: string
  ingredients: Ingredient[]
}

export const ProductCard = ({ imageUrl, id, name, price, ingredients }: Props) => {
  return (
    <div>
      <Link href={`/product/${id}`}>
        <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
          <img className={'w-[215px] h-[215px]'} src={imageUrl} alt={name} />
        </div>
        <Typography className={'mt-4 mb-2'} textAlign={'left'} variant={'subtitle'}>
          {name}
        </Typography>
        <Typography
          textAlign={'left'}
          className={'text-sm text-gray-400 font-normal'}
          variant={'bodySemiBold'}
        >
          {ingredients.map(ingredient => ingredient.name).join(', ')}
        </Typography>
        <div className={'flex justify-between items-center mt-4'}>
          <div className={'flex gap-1'}>
            <Typography className={'font-normal'} variant={'price'}>
              от
            </Typography>
            <Typography variant={'price'}>{price} ₽</Typography>
          </div>

          <Button>
            <Plus size={20} className={'mr-1'} />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
