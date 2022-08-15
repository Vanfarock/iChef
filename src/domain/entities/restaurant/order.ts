import Entity from '@shared/domain/entities/entity'

export enum OrderStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Finished = 'finished',
  Cancelled = 'cancelled',
}

type OrderProps = {
  restaurantId: string,
  customerId: string,
  itemsId: string[],
  dateTime: Date,
  status: OrderStatus,
  value: number
}

export default class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string) {
    super(props, id)
  }

  static create(props: OrderProps, id?: string) {
    const order = new Order(props, id)

    return order
  }
}
