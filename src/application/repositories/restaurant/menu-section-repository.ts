import MenuItem from '@entities/restaurant/menuItem'

export default interface MenuSectionRepository {
  getMenu(menuSectionId: string): Promise<string>
  add(item: MenuItem): Promise<void>
}
