import MenuItem from '@entities/restaurant/menuItem'
import MenuItemRepositorySpy from '@tests/repositories/restaurant/menu-item-repository-spy'
import { OrderRepositorySpy } from '@tests/repositories/restaurant/order-repository-spy'
import ReceiveOrder from './receive-order'

type SutOutput = {
  sut: ReceiveOrder
  orderRepository: OrderRepositorySpy
  menuItemRepository: MenuItemRepositorySpy
}

const makeSut = (): SutOutput => {
  const orderRepository = new OrderRepositorySpy()
  const menuItemRepository = new MenuItemRepositorySpy()
  const sut = new ReceiveOrder(orderRepository, menuItemRepository)

  return { sut, orderRepository, menuItemRepository }
}

describe('ReceiveOrder', () => {
  it('should add new pending order for the restaurant', async () => {
    const { sut, orderRepository, menuItemRepository } = makeSut()

    const item1 = MenuItem.create({
      restaurantId: 'restaurant_id',
      name: 'item1',
      description: 'description',
      value: 0,
    }, 'item1_id')
    const item2 = MenuItem.create({
      restaurantId: 'restaurant_id',
      name: 'item2',
      description: 'description',
      value: 0,
    }, 'item2_id')
    await menuItemRepository.add(item1)
    await menuItemRepository.add(item2)

    const result = await sut.execute({
      restaurantId: 'restaurant_id',
      customerId: 'customer_id',
      itemsId: ['item1_id', 'item2_id'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.right().unwrap()).toEqual('order_id')
    expect(orderRepository.addCount).toBe(1)
    expect(orderRepository.orders).toHaveLength(1)
    expect(menuItemRepository.areFromRestaurantCount).toBe(1)
    expect(menuItemRepository.getTotalValueCount).toBe(1)
  })

  it('should return error if no items are provided', async () => {
    const { sut, orderRepository } = makeSut()

    const result = await sut.execute({
      restaurantId: 'restaurant_id',
      customerId: 'customer_id',
      itemsId: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.left().unwrap().message).toEqual('At least one item should be selected.')
    expect(orderRepository.addCount).toBe(0)
    expect(orderRepository.orders).toHaveLength(0)
  })

  it('should return error if any of the items are from a differente restaurant', async () => {
    const { sut, orderRepository, menuItemRepository } = makeSut()

    const item1 = MenuItem.create({
      restaurantId: 'restaurant_id',
      name: 'item1',
      description: 'description',
      value: 0,
    }, 'item1_id')
    const item2 = MenuItem.create({
      restaurantId: 'different_restaurant_id',
      name: 'item2',
      description: 'description',
      value: 0,
    }, 'item2_id')
    await menuItemRepository.add(item1)
    await menuItemRepository.add(item2)

    const result = await sut.execute({
      restaurantId: 'restaurant_id',
      customerId: 'customer_id',
      itemsId: ['item1_id', 'item2_id'],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.left().unwrap().message).toEqual('There are some items that are not from the restaurant.')
    expect(orderRepository.addCount).toBe(0)
    expect(orderRepository.orders).toHaveLength(0)
    expect(menuItemRepository.areFromRestaurantCount).toBe(1)
  })
})
