import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(6, { error: 'Пароль должен содержать не менее 6 символов' })

export const loginFormSchema = z.object({
  email: z.email({ error: 'Введите корректную почту' }),
  password: passwordSchema,
})

export const registerFormSchema = loginFormSchema
  .extend({
    fullName: z.string().min(2, { error: 'Введите имя и фамилию' }),
    confirmedPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmedPassword, {
    error: 'Пароли не совпадают',
    path: ['confirmedPassword'],
  })

export type LoginFormValues = z.infer<typeof loginFormSchema>
export type RegisterFormValues = z.infer<typeof registerFormSchema>
