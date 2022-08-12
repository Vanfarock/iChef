import {
  Either, right,
} from '@functional/either'
import MenuItem from '@entities/restaurant/menuItem'

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

export class AddItem {
  constructor(readonly menuItemRepository: MenuItemRepository) {}

  async execute(): Promise<Either<AddItemError, void>> {
    const menuItem = MenuItem.create({
      menuId: '',
      menuSectionId: '',
    })

    this.menuItemRepository.add(menuItem)

    return right(undefined)
  }
}

export interface MenuItemRepository {
  add(item: MenuItem): Promise<Either<AddItemError, void>>;
}

class MenuItemRepositoryMock implements MenuItemRepository {
  items: MenuItem[] = []

  async add(item: MenuItem): Promise<Either<AddItemError, void>> {
    this.items.push(item)

    return right(undefined)
  }
}

describe('AddItem', () => {
  it('should add new item to menu', () => {
    const menuItemRepository = new MenuItemRepositoryMock()
    const addItem = new AddItem(menuItemRepository)

    addItem.execute()

    expect(menuItemRepository.items).toHaveLength(1)
  })
})
