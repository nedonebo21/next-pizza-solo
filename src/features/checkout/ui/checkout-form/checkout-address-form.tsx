import { Card } from '@/shared/ui'
import { ControlledTextarea, ControlledAddressInput } from '@/shared/forms'
import { useFormContext } from 'react-hook-form'
import { CheckoutFormValues } from '@/features/checkout/model'

export const CheckoutAddressForm = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<CheckoutFormValues>()

  return (
    <Card title={'3. Адрес доставки'}>
      <div className={'flex flex-col gap-5'}>
        <ControlledAddressInput
          control={control}
          name={'address'}
          placeholder={'Введите адрес'}
          label={'Адрес'}
          errorMessage={errors.address?.message}
          required
        />
        <ControlledTextarea
          control={control}
          name={'comment'}
          className={'text-base'}
          placeholder={'Комментарий к заказу'}
          rows={5}
        />
      </div>
    </Card>
  )
}
