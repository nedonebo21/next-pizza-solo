import { PRICE_MAX, PRICE_MIN } from '@/features/browse-products/model/constants'

import { prisma } from '../../../../../prisma/prisma-client'

export type GetSearchParams = {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
  min?: string
  max?: string
}

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number)

  const pizzaTypes = params.pizzaTypes?.split(',').map(Number)

  const ingredientsId = params.ingredients?.split(',').map(Number)

  const minPrice = Number(params.min) || PRICE_MIN

  const maxPrice = Number(params.max) || PRICE_MAX

  return await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsId
            ? {
                some: {
                  id: {
                    in: ingredientsId,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  })
}
