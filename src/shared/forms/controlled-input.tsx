import { ClearButton, Input, RequiredSymbol, Typography } from '@/shared/ui'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ControlledInputProps<T extends FieldValues> = {
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
  errorMessage?: string
  control: Control<T>
} & Omit<UseControllerProps<T>, 'control'>

export const ControlledInput = <T extends FieldValues>({
  label,
  required,
  className,
  errorMessage,
  name,
  rules,
  control,
  ...rest
}: ControlledInputProps<T>) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    rules,
    control,
    ...rest,
  })

  const handleClear = () => {
    onChange('')
  }

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
      <div className={'relative'}>
        <Input className={'h-12 text-md'} {...{ ...rest, value, onChange, onBlur, id: name }} />
        <ClearButton onClick={handleClear} />
      </div>
      {isError && (
        <Typography variant={'error'} as={'p'} textAlign={'left'} className={'text-sm mt-2'}>
          {errorMessage}
        </Typography>
      )}
    </label>
  )
}
