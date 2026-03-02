'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { registerFormSchema } from '@/entities/user'
import { updateUser } from '@/features/edit-profile/api/update-user'
import { ControlledInput } from '@/shared/forms'
import { Button, Container, Typography } from '@/shared/ui'

import type { RegisterFormValues } from '@/entities/user'
import type { User } from '@prisma/client'
import type { SubmitHandler } from 'react-hook-form'

type EditProfileProps = {
  user: User
}

export const EditProfile = ({ user }: EditProfileProps) => {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: '',
      confirmedPassword: '',
    },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data, e) => {
    try {
      await updateUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      })
      toast.success('Данные обновлены')
    } catch (error) {
      return toast.error('Ошибка при обновлении данных')
    }
  }

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  }

  return (
    <Container className={'my-10'}>
      <Typography textAlign={'center'} variant={'subtitle'}>
        Личные данные | #{user.id}
      </Typography>
      <FormProvider {...form}>
        <form
          className={'flex flex-col gap-5 w-96 mt-10 mx-auto'}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ControlledInput control={form.control} name={'email'} label={'Email'} />
          <ControlledInput control={form.control} name={'fullName'} label={'Полное имя'} />
          <ControlledInput control={form.control} name={'password'} label={'Пароль'} />
          <ControlledInput
            control={form.control}
            name={'confirmedPassword'}
            label={'Повторите пароль'}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className={'text-base mt-10'}
            type={'submit'}
          >
            Сохранить
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
            onClick={handleSignOut}
            className={'text-base'}
            variant={'secondary'}
            type={'button'}
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}
