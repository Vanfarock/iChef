import MenuItem from '@entities/restaurant/menuItem'
import MenuItemRepository from 'src/application/repositories/restaurant/menu-item-repository'

export default class MenuItemRepositorySpy implements MenuItemRepository {
  items: MenuItem[] = []
  callsCount = 0
  areFromRestaurantCount = 0
  getTotalValueCount = 0

  async add(item: MenuItem): Promise<void> {
    this.items.push(item)
    this.callsCount += 1
  }

  async areFromRestaurant(itemsId: string[], restaurantId: string): Promise<boolean> {
    this.areFromRestaurantCount += 1

    for (const item of this.items.filter((i) => itemsId.includes(i.id()))) {
      if (item.restaurantId() !== restaurantId) {
        return false
      }
    }
    return true
  }

  async getTotalValue(itemsId: string[]): Promise<number> {
    this.getTotalValueCount += 1

    let totalValue = 0

    for (const item of this.items) {
      totalValue += item.value()
    }

    return totalValue
  }
}
