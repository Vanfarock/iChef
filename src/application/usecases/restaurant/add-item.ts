import MenuItem from '@entities/restaurant/menuItem'
import { Either, left, right } from '@functional/either'
import MenuItemRepository from 'src/application/repositories/restaurant/menu-item-repository'
import MenuSectionRepository from 'src/application/repositories/restaurant/menu-section-repository'

export class AddMenuItemError implements Error {
  name: string
  message: string
  stack?: string

  constructor(message: string, stack?: string) {
    this.name = 'AddItemError'
    this.message = message
    this.stack = stack
  }
}

type AddItemRequest = {
  restaurantId: string,
  menuSectionId?: string,
  name: string,
  description: string,
  value: number,
}

export default class AddMenuItem {
  constructor(
    readonly menuItemRepository: MenuItemRepository,
    readonly menuSectionRepository: MenuSectionRepository,
  ) { }

  async execute(request: AddItemRequest): Promise<Either<AddMenuItemError, void>> {
    const {
      restaurantId, menuSectionId, name, description, value,
    } = request
    const item = MenuItem.create({
      restaurantId,
      menuSectionId,
      name,
      description,
      value,
    })

    if (menuSectionId) {
      const comparedRestaurantId = await this.menuSectionRepository.getRestaurant(menuSectionId)

      if (comparedRestaurantId !== restaurantId) {
        return left(new AddMenuItemError('Menu section is from a different restaurant.'))
      }

      await this.menuSectionRepository.add(item)
    }

    await this.menuItemRepository.add(item)

    return right(undefined)
  }
}
