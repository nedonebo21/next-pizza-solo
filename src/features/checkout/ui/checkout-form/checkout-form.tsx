'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { checkoutSchema } from '@/features/checkout/model'

import type { CheckoutFormValues } from '@/features/checkout/model'
import type { ReactNode } from 'react'
import type { SubmitHandler } from 'react-hook-form'


type Props = {
  onSubmit: SubmitHandler<CheckoutFormValues>
  children: ReactNode
}
export const CheckoutForm = ({ children, onSubmit: onSubmitFormProps }: Props) => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  const onSubmit: typeof onSubmitFormProps = (data, e) => {
    onSubmitFormProps(data, e)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
