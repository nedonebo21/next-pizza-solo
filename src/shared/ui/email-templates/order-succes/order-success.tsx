import type { CartItemDTO } from '@/entities/cart'

type OrderSuccessProps = {
  orderId: number
  products: CartItemDTO[]
}
export const OrderSuccess = ({ orderId, products }: OrderSuccessProps) => {
  return (
    <div>
      <h1>Спасибо за покупку!</h1>

      <p>Ваш заказ #${orderId} оплачен. Список товаров:</p>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.productVariant.product.name} | {product.productVariant.price} ₽ x
            {product.quantity} шт. = {product.productVariant.price * product.quantity} ₽
          </li>
        ))}
      </ul>
    </div>
  )
}
