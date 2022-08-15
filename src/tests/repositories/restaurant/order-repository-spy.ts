import Order from '@entities/restaurant/order'
import OrderRepository from '@repositories/restaurant/order-repository'

export class OrderRepositorySpy implements OrderRepository {
  orders: Order[] = []
  addCount = 0

  async add(order: Order): Promise<string> {
    this.orders.push(order)
    this.addCount += 1
    return 'order_id'
  }
}
