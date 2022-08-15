import Order, { OrderStatus } from '@entities/restaurant/order'
import { Either, left, right } from '@functional/either'
import MenuItemRepository from '@repositories/restaurant/menu-item-repository'
import OrderRepository from '@repositories/restaurant/order-repository'

export class ReceiveOrderError implements Error {
  name: string
  message: string
  stack?: string

  constructor(message: string, stack?: string) {
    this.name = 'AddItemError'
    this.message = message
    this.stack = stack
  }
}

export type ReceiveOrderRequest = {
  restaurantId: string,
  customerId: string,
  itemsId: string[],
}

export default class ReceiveOrder {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly menuItemRepository: MenuItemRepository,
  ) { }

  async execute(request: ReceiveOrderRequest): Promise<Either<ReceiveOrderError, string>> {
    const {
      restaurantId, customerId, itemsId,
    } = request

    if (itemsId.length === 0) {
      return left(new ReceiveOrderError('At least one item should be selected.'))
    }

    const itemsAreFromRestaurant = await this.menuItemRepository.areFromRestaurant(
      itemsId,
      restaurantId,
    )
    if (!itemsAreFromRestaurant) {
      return left(new ReceiveOrderError('There are some items that are not from the restaurant.'))
    }

    const dateTime = new Date()
    const status = OrderStatus.Pending
    const value = await this.menuItemRepository.getTotalValue(itemsId)

    const order = Order.create({
      restaurantId,
      customerId,
      itemsId,
      dateTime,
      status,
      value,
    })
    const orderId = await this.orderRepository.add(order)

    return right(orderId)
  }
}
