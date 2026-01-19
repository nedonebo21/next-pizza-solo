import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Api } from '@/shared/services'
import { useSet } from 'react-use'

type ReturnProps = {
  ingredients: Ingredient[]
  isLoading: boolean
  selectedIngredients: Set<string>
  onToggleId: (id: string) => void
}

export const useIngredientsFilter = (values: string[] = []): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedIngredients, { toggle }] = useSet(new Set<string>(values))

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

  return { ingredients, isLoading, selectedIngredients, onToggleId: toggle }
}
