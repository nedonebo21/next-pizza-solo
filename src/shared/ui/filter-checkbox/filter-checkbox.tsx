import { Checkbox } from '@/shared/ui/shadcn/checkbox'
import { ComponentProps, useId } from 'react'
import { Typography } from '@/shared/ui/typography'

export type FilterCheckboxProps = {
  value: string
  label: string
} & Omit<ComponentProps<typeof Checkbox>, 'value' | 'name'>

export const FilterCheckbox = ({ label, value, id, ...rest }: FilterCheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? `${generatedId}-checkbox`
  return (
    <label className={'flex items-center gap-3 cursor-pointer'}>
      <Checkbox value={value} id={checkboxId} {...rest} />
      <Typography variant={'bodyNormal'}>{label}</Typography>
    </label>
  )
}
