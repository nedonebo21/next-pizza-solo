import { cn } from '@/shared/lib/utils'
import { GroupVariants, IngredientItem, ProductImage, Typography } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn/button'
import { useState } from 'react'
import { Ingredient, ProductVariant } from '@prisma/client'
import { useSet } from 'react-use'
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/entities/product'

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
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

  const details = '30см, традиционное тесто'

  const handleSizeChange = (size: string) => {
    setSize(Number(size) as PizzaSize)
  }

  const handleTypeChange = (type: string) => {
    setType(Number(type) as PizzaType)
  }

  const pizzaPrice =
    variants.find(variant => variant.pizzaType === type && variant.size === size)?.price ?? 0

  const ingredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  const totalPrice = pizzaPrice + ingredientsPrice

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} size={size} hasBorders={true} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <Typography className={'mb-1'} variant={'title'} as={'h4'} textAlign={'left'}>
          {name}
        </Typography>
        <Typography className={'text-gray-400'} variant={'bodySemiBold'} textAlign={'left'}>
          {details}
        </Typography>
        <div className={'flex flex-col gap-4 mt-5'}>
          <GroupVariants items={pizzaSizes} value={String(size)} onClick={handleSizeChange} />
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
        <Button className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
