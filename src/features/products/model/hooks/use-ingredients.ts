import { useEffect, useState } from 'react'
import { Ingredient } from '@prisma/client'
import { Api } from '@/shared/services'

export const useIngredients = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

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
