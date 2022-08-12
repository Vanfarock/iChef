import MenuItem from '@entities/restaurant/menuItem'

export default interface MenuItemRepository {
  add(item: MenuItem): Promise<void>;
}
