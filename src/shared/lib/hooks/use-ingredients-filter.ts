import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Api } from '@/shared/services'

type ReturnProps = {
  ingredients: Ingredient[]
  isLoading: boolean
}

export const useIngredientsFilter = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setIsLoading(true)
        const ingredientsRes = await Api.ingredients.getAll()
        setIngredients(ingredientsRes)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return { ingredients, isLoading }
}
