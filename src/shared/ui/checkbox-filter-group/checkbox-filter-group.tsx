'use client'

import { ChangeEvent, useState } from 'react'
import type { FilterCheckboxProps } from '@/shared/ui/filter-checkbox'
import { FilterCheckbox } from '@/shared/ui/filter-checkbox'
import { Input } from '@/shared/ui/shadcn/input'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

type Item = FilterCheckboxProps

interface Props {
  title: string
  items: Item[]
  limit?: number
  isLoading?: boolean
  searchInputPlaceholder?: string
  onCheckboxClick?: (id: string) => void
  defaultValue?: string[]
  selectedItems?: Set<string>
  className?: string
}

export const CheckboxFilterGroup = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  isLoading,
  onCheckboxClick,
  selectedItems,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const toggleShowAll = () => {
    setShowAll(prev => !prev)
    setSearchValue('')
  }

  const shouldShowButton = items.length > limit

  if (isLoading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />)}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    )
  }

  const list = showAll
    ? items.filter(item => item.label.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    : items.slice(0, limit)

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={handleInputChange}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-y-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={`${index}-${item.value}`}
            label={item.label}
            value={item.value}
            checked={selectedItems?.has(item.value)}
            onCheckedChange={() => onCheckboxClick?.(item.value)}
          />
        ))}
      </div>

      {shouldShowButton && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={toggleShowAll} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
