'use client'

import { useController } from 'react-hook-form'

import { Textarea } from '@/shared/ui'

import type { Control, FieldValues, UseControllerProps } from 'react-hook-form'

type ControlledTextareaProps<T extends FieldValues> = {
  required?: boolean
  className?: string
  placeholder?: string
  rows?: number
  control: Control<T>
} & Omit<UseControllerProps<T>, 'control'>

export const ControlledTextarea = <T extends FieldValues>({
  required,
  className,
  name,
  rules,
  rows,
  control,
  ...rest
}: ControlledTextareaProps<T>) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    rules,
    control,
    ...rest,
  })

  return (
    <div className={'relative'}>
      <Textarea className={'h-12 text-md'} {...{ ...rest, value, onChange, onBlur, id: name }} />
    </div>
  )
}
