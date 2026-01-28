import { cn } from '@/shared/lib/utils'
import { GroupVariants, IngredientItem, ProductImage, Typography } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn/button'
import { Ingredient, ProductVariant } from '@prisma/client'
import { PizzaSize, PizzaType, pizzaTypes } from '@/entities/product'
import { getPizzaDetails, usePizzaOptions } from '../../../model'

type ChoosePizzaFormProps = {
  className?: string
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  variants: ProductVariant[]
  onAddToCart?: () => void
}

export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  variants,
  onAddToCart,
}: ChoosePizzaFormProps) => {
  const { type, setType, size, setSize, availableSizes, selectedIngredients, addIngredient } =
    usePizzaOptions(variants)

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    variants,
    ingredients,
    selectedIngredients
  )

  const handleSizeChange = (size: string) => {
    setSize(Number(size) as PizzaSize)
  }

  const handleTypeChange = (type: string) => {
    setType(Number(type) as PizzaType)
  }

  const handleAddToCard = () => {
    onAddToCart?.()
  }

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} size={size} hasBorders={true} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <Typography className={'mb-1'} variant={'title'} as={'h4'} textAlign={'left'}>
          {name}
        </Typography>
        <Typography className={'text-gray-400'} variant={'bodySemiBold'} textAlign={'left'}>
          {textDetails}
        </Typography>
        <div className={'flex flex-col gap-4 mt-5'}>
          <GroupVariants items={availableSizes} value={String(size)} onClick={handleSizeChange} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={handleTypeChange} />
        </div>
        <div className={'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'}>
          <div className={'grid grid-cols-3 gap-3'}>
            {ingredients.map(ingredient => {
              const isActive = selectedIngredients.has(ingredient.id)
              const handleIngredientAdd = () => addIngredient(ingredient.id)

              return (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  active={isActive}
                  onClick={handleIngredientAdd}
                />
              )
            })}
          </div>
        </div>
        <Button
          className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}
          onClick={handleAddToCard}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
