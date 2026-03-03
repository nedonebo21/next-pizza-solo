'use client'

import { AddressSuggestions } from 'react-dadata'
import { useController } from 'react-hook-form'

import { RequiredSymbol, Typography } from '@/shared/ui'

import type { DaDataAddress, DaDataSuggestion } from 'react-dadata'
import type { Control, FieldValues, UseControllerProps } from 'react-hook-form'

type ControlledAddressProps<T extends FieldValues> = {
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
  errorMessage?: string
  control: Control<T>
} & Omit<UseControllerProps<T>, 'control'>

export const ControlledAddressInput = <T extends FieldValues>({
  label,
  required,
  className,
  errorMessage,
  name,
  rules,
  control,
  ...rest
}: ControlledAddressProps<T>) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    rules,
    control,
    ...rest,
  })

  const handleAddressChange = (suggestion?: DaDataSuggestion<DaDataAddress>) => {
    if (suggestion) {
      onChange(suggestion.value)
    } else {
      onChange('')
    }
  }

  const suggestionValue = value
    ? ({ value: value as string } as DaDataSuggestion<DaDataAddress>)
    : undefined

  const isError = !!errorMessage

  return (
    <label className={className}>
      {label && (
        <Typography
          textAlign={'left'}
          variant={'bodyNormal'}
          as={'p'}
          className={'flex gap-1 font-medium mb-2'}
        >
          {label}
          {required && <RequiredSymbol />}
        </Typography>
      )}
      <AddressSuggestions
        token={process.env.NEXT_PUBLIC_DADATA_TOKEN!}
        value={suggestionValue}
        onChange={handleAddressChange}
        containerClassName="w-full"
        inputProps={{
          className:
            'w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent',
          placeholder: rest.placeholder,
        }}
        suggestionClassName="mt-1 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
        currentSuggestionClassName="bg-blue-50"
        highlightClassName="bg-yellow-200 font-bold"
        hintClassName="px-3 py-1 text-sm text-gray-500 bg-gray-50"
        {...{ ...rest, onBlur, id: name }}
      />
      {isError && (
        <Typography variant={'error'} as={'p'} textAlign={'left'} className={'text-sm mt-2'}>
          {errorMessage}
        </Typography>
      )}
    </label>
  )
}
