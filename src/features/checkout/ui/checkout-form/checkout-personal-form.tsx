'use client'

import { useFormContext } from 'react-hook-form'

import { ControlledInput } from '@/shared/forms'
import { Card } from '@/shared/ui'

import type { CheckoutFormValues } from '@/features/checkout/model'

type CheckoutPersonalFormProps = {
  className?: string
}

export const CheckoutPersonalForm = ({ className }: CheckoutPersonalFormProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<CheckoutFormValues>()

  return (
    <Card title={'2. Персональные данные'} className={className}>
      <div className={'grid grid-cols-2 gap-5'}>
        <ControlledInput
          control={control}
          name={'firstName'}
          label={'Имя'}
          placeholder={'Имя'}
          errorMessage={errors.firstName?.message}
          required
        />
        <ControlledInput
          control={control}
          name={'lastName'}
          label={'Фамилия'}
          placeholder={'Фамилия'}
          errorMessage={errors.lastName?.message}
          required
        />
        <ControlledInput
          control={control}
          name={'email'}
          label={'E-Mail'}
          placeholder={'E-Mail'}
          errorMessage={errors.email?.message}
          required
        />
        <ControlledInput
          control={control}
          name={'phone'}
          label={'Телефон'}
          placeholder={'Телефон'}
          errorMessage={errors.phone?.message}
          required
        />
      </div>
    </Card>
  )
}
