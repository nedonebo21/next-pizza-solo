import { axiosInstance } from '@/shared/api'
import { PaymentData } from '@/features/checkout/model/types'

type createPaymentProps = {
  description: string
  orderId: number
  amount: number
}

export const createPayment = async (details: createPaymentProps) => {
  const { data } = await axiosInstance.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    }
  )

  return data
}
