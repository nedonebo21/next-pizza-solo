'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { checkoutSchema } from '@/features/checkout/model'

import type { CheckoutFormValues } from '@/features/checkout/model'
import { ReactNode, useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { getMe } from '@/entities/user'

type Props = {
  onSubmit: SubmitHandler<CheckoutFormValues>
  children: ReactNode
}
export const CheckoutForm = ({ children, onSubmit: onSubmitFormProps }: Props) => {
  const { data: session } = useSession()

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

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await getMe()
      const [firstName, lastName] = data.fullName.split(' ')

      form.setValue('firstName', firstName)
      form.setValue('lastName', lastName)
      form.setValue('email', data.email)
    }

    if (session) {
      fetchUserInfo()
    }
  }, [session])

  const onSubmit: typeof onSubmitFormProps = (data, e) => {
    onSubmitFormProps(data, e)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
