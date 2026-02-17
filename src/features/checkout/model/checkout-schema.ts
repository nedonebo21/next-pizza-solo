import { z } from 'zod'

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать не менее 2х символов'),
  lastName: z.string().min(2, 'Фамилия должна содержать не менее 2х символов'),
  email: z.email({ error: 'Введите корректную почту' }),
  phone: z
    .string()
    .min(10, 'Введите корректный номер телефона')
    .regex(/^[0-9+\-\s()]+$/, 'Номер телефона содержит недопустимые символы'),
  address: z.string().min(5, 'Введите корректный адрес'),
  comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
