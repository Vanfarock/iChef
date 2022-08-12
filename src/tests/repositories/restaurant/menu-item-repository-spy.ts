import MenuItem from '@entities/restaurant/menuItem'
import MenuItemRepository from 'src/application/repositories/restaurant/menu-item-repository'

export default class MenuItemRepositorySpy implements MenuItemRepository {
  items: MenuItem[] = []
  callsCount = 0

  async add(item: MenuItem): Promise<void> {
    this.items.push(item)
    this.callsCount += 1
  }
}
