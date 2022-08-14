import MenuItem from '@entities/restaurant/menuItem'

export default interface MenuItemRepository {
  add(item: MenuItem): Promise<void>;
  areFromRestaurant(itemsId: string[], restaurantId: string): Promise<boolean>
  getTotalValue(itemsId: string[]): Promise<number>
}
