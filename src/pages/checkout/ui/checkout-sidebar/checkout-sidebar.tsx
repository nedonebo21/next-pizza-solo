import { Button, Card, Typography } from '@/shared/ui'
import { DeliveryDetails } from './delivery-details'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'

type CheckoutSidebarProps = {
  totalAmount: number
  loading: boolean
}
export const CheckoutSidebar = ({ totalAmount, loading }: CheckoutSidebarProps) => {
  const taxPrice = totalAmount / 10
  const deliveryPrice = 120
  const totalPrice = taxPrice + totalAmount + deliveryPrice
  return (
    <div className={'w-[450px]'}>
      <Card className={'p-6 sticky top-4'}>
        <div className={'flex flex-col gap-1'}>
          <Typography textAlign={'left'} variant={'price'} as={'span'}>
            Итого:
          </Typography>
          <Typography className={'text-[34px]'} textAlign={'left'} variant={'title'} as={'span'}>
            {totalPrice} ₽
          </Typography>
        </div>

        <DeliveryDetails
          icon={<Package size={18} className={'mr-2 text-gray-400'} />}
          title={'Стоимость корзины'}
          price={totalAmount}
        />
        <DeliveryDetails
          icon={<Percent size={18} className={'mr-2 text-gray-400'} />}
          title={'Налоги'}
          price={taxPrice}
        />
        <DeliveryDetails
          icon={<Truck size={18} className={'mr-2 text-gray-400'} />}
          title={'Доставка'}
          price={deliveryPrice}
        />

        <Button
          isLoading={loading}
          disabled={loading}
          type={'submit'}
          className={'w-full h-14 rounded-2xl mt-6 text-base font-bold'}
        >
          Перейти к оплате
          <ArrowRight />
        </Button>
      </Card>
    </div>
  )
}
