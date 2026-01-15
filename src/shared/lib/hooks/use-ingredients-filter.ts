import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Api } from '@/shared/services'

type ReturnProps = {
  ingredients: Ingredient[]
}

export const useIngredientsFilter = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredientsRes = await Api.ingredients.getAll()
        setIngredients(ingredientsRes)
      } catch (e) {
        console.error(e)
      }
    }

    fetchIngredients()
  }, [])

  return { ingredients }
}
