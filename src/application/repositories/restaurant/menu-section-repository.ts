import MenuItem from '@entities/restaurant/menuItem'
import MenuSection from '@entities/restaurant/menuSection'

export default interface MenuSectionRepository {
  getRestaurant(menuSectionId: string): Promise<string>
  add(item: MenuItem): Promise<void>
  create(section: MenuSection): Promise<void>
}
