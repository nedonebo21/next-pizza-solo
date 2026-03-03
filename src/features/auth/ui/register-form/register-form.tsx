import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { registerFormSchema } from '@/entities/user'
import { registerUser } from '@/features/auth/api/register-user'
import { ControlledInput } from '@/shared/forms'
import { Button, Typography } from '@/shared/ui'

import type { RegisterFormValues } from '@/entities/user'
import type { SubmitHandler } from 'react-hook-form'

type RegisterFormProps = {
  onClose?: () => void
}
export const RegisterForm = ({ onClose }: RegisterFormProps) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      confirmedPassword: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data, e) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      })

      toast.success('Вы успешно зарегистрировались. Подтвердите почту')

      onClose?.()
    } catch (error) {
      toast.error('Неверный email или пароль')
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
              Регистрация аккаунта
            </Typography>
            <Typography textAlign={'left'} className={'text-gray-400'} variant={'bodyNormal'}>
              Введите свою почту и пароль, чтобы создать аккаунт
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
        <ControlledInput control={form.control} name={'fullName'} label={'Полное имя'} required />
        <ControlledInput
          control={form.control}
          name={'password'}
          label={'Пароль'}
          placeholder={'Введите пароль...'}
          required
        />
        <ControlledInput
          control={form.control}
          name={'confirmedPassword'}
          label={'Подтвердите пароль'}
          required
        />

        <Button className={'h-12 text-base'} type={'submit'} disabled={isSubmitting}>
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>
    </FormProvider>
  )
}
