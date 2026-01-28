import { cn } from '@/shared/lib/utils'
import { ProductImage, Typography } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn/button'

type ChoosePizzaFormProps = {
  className?: string
  imageUrl: string
  name: string
  onAddToCart?: () => void
}

export const ChooseProductForm = ({
  className,
  imageUrl,
  name,
  onAddToCart,
}: ChoosePizzaFormProps) => {
  const details = 'Дефолт продукт крутой'
  const totalPrice = 320
  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} size={20} hasBorders={false} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <Typography className={'mb-1'} variant={'title'} as={'h4'} textAlign={'left'}>
          {name}
        </Typography>
        <Typography className={'text-gray-400'} variant={'bodySemiBold'} textAlign={'left'}>
          {details}
        </Typography>
        <Button className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
