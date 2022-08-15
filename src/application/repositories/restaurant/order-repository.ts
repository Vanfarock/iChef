import Order from '@entities/restaurant/order'

export default interface OrderRepository {
  add(order: Order): Promise<string>
}
