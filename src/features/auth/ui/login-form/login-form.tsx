import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { loginFormSchema, LoginFormValues } from '@/entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@/shared/ui'
import { ControlledInput } from '@/shared/forms'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

type LoginFormProps = {
  onClose?: () => void
}
export const LoginForm = ({ onClose }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data, e) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (!res?.ok) {
        throw Error()
      }

      toast.success('Вы успешно вошли в аккаунт')

      onClose?.()
    } catch (error) {
      toast.error('Не удалось войти в аккаунт')
      console.error(error)
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <FormProvider {...form}>
      <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'flex justify-between items-center'}>
          <div className={'mr-2'}>
            <Typography textAlign={'left'} className={'font-bold'} variant={'subtitle'} as={'h3'}>
              Вход в аккаунт
            </Typography>
            <Typography textAlign={'left'} className={'text-gray-400'} variant={'bodyNormal'}>
              Введите свою почту, чтобы войти в аккаунт
            </Typography>
          </div>
        </div>

        <ControlledInput
          control={form.control}
          name={'email'}
          label={'Email'}
          placeholder={'example@domain.com'}
          required
        />
        <ControlledInput
          control={form.control}
          name={'password'}
          label={'Пароль'}
          placeholder={'Введите пароль...'}
          required
        />

        <Button className={'h-12 text-base'} type={'submit'} disabled={isSubmitting}>
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </FormProvider>
  )
}
