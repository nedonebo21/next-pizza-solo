type PayOrderProps = {
  orderId: number
  totalPrice: number
  paymentUrl: string
}
export const PayOrder = ({ orderId, totalPrice, paymentUrl }: PayOrderProps) => {
  return (
    <div>
      <h2 style={{ fontSize: '36px', fontWeight: 800, textAlign: 'center' }}>
        Заказ #{orderId} оформлен!
      </h2>
      <p style={{ fontSize: '20px', fontWeight: 700, textAlign: 'center' }}>
        Оплатите заказ на сумму: {totalPrice} ₽. Нажмите&nbsp;
        <a href={paymentUrl} style={{ color: '#007bff' }}>
          здесь
        </a>
        &nbsp; для оплаты заказа.
      </p>
    </div>
  )
}
