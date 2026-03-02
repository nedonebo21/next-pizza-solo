'use client'

import { useEffect, useState } from 'react'

import * as ingredientApi from '@/entities/ingredient'

import type { Ingredient } from '@prisma/client'

export const useIngredients = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setIsLoading(true)
        const ingredientsRes = await ingredientApi.getAll()

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
