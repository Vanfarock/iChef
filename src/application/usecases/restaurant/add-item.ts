import MenuItem from '@entities/restaurant/menuItem'
import { Either, left, right } from '@functional/either'
import MenuItemRepository from 'src/application/repositories/restaurant/menu-item-repository'
import MenuSectionRepository from 'src/application/repositories/restaurant/menu-section-repository'

export class AddItemError implements Error {
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
  menuId: string,
  menuSectionId?: string,
}

export default class AddItem {
  constructor(
    readonly menuItemRepository: MenuItemRepository,
    readonly menuSectionRepository: MenuSectionRepository,
  ) {}

  async execute({ menuId, menuSectionId }: AddItemRequest): Promise<Either<AddItemError, void>> {
    const item = MenuItem.create({
      menuId, menuSectionId,
    })

    if (menuSectionId) {
      const comparedMenuId = await this.menuSectionRepository.getMenu(menuSectionId)

      if (comparedMenuId !== menuId) {
        return left(new AddItemError('Menu section is from a different menu.'))
      }

      await this.menuSectionRepository.add(item)
    }

    await this.menuItemRepository.add(item)

    return right(undefined)
  }
}
