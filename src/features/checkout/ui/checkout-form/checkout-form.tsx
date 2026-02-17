import { ReactNode } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { CheckoutFormValues, checkoutSchema } from '@/features/checkout/model'
import { zodResolver } from '@hookform/resolvers/zod'

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
