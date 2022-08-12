import MenuItem from '@entities/restaurant/menuItem'
import MenuSection from '@entities/restaurant/menuSection'
import MenuSectionRepository from '@repositories/restaurant/menu-section-repository'

export default class MenuSectionRepositorySpy implements MenuSectionRepository {
  items: MenuItem[] = []
  getMenuCallsCount = 0
  addCallsCount = 0
  createCallsCount = 0

  async getMenu(menuSectionId: string): Promise<string> {
    this.getMenuCallsCount += 1

    return 'menu_id'
  }

  async add(item: MenuItem): Promise<void> {
    this.items.push(item)
    this.addCallsCount += 1
  }

  async create(section: MenuSection): Promise<void> {
    this.createCallsCount += 1
  }
}
