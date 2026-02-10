import { cn } from '@/shared/lib/utils'
import { ProductImage, Typography } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn/button'
import { DialogTitle } from '@/shared/ui/shadcn/dialog'

type ChoosePizzaFormProps = {
  className?: string
  isLoading: boolean
  imageUrl: string
  price: number
  name: string
  onSubmit: () => void
}

export const ChooseProductForm = ({
  className,
  imageUrl,
  price,
  name,
  onSubmit,
  isLoading,
}: ChoosePizzaFormProps) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} size={20} hasBorders={false} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <DialogTitle>
          <Typography className={'mb-1'} variant={'title'} as={'span'} textAlign={'left'}>
            {name}
          </Typography>
        </DialogTitle>
        <Button
          onClick={() => onSubmit()}
          isLoading={isLoading}
          className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
