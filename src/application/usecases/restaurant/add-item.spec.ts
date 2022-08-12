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

type AddItemRequest = {
  menuId: string,
  menuSectionId?: string,
}

export class AddItem {
  constructor(readonly menuItemRepository: MenuItemRepository) {}

  async execute({ menuId, menuSectionId }: AddItemRequest): Promise<Either<AddItemError, void>> {
    this.menuItemRepository.add(MenuItem.create({
      menuId, menuSectionId,
    }))

    return right(undefined)
  }
}

export interface MenuItemRepository {
  add(item: MenuItem): Promise<Either<AddItemError, void>>;
}

class MenuItemRepositorySpy implements MenuItemRepository {
  items: MenuItem[] = []
  callsCount = 0

  async add(item: MenuItem): Promise<Either<AddItemError, void>> {
    this.items.push(item)
    this.callsCount += 1

    return right(undefined)
  }
}

type SutOutput = {
  sut: AddItem,
  menuItemRepository: MenuItemRepositorySpy,
}

const makeSut = (): SutOutput => {
  const menuItemRepository = new MenuItemRepositorySpy()
  const sut = new AddItem(menuItemRepository)

  return {
    sut,
    menuItemRepository,
  }
}

describe('AddItem', () => {
  it('should add new item to menu', async () => {
    const { sut, menuItemRepository } = makeSut()

    await sut.execute({ menuId: 'menu_id' })

    expect(menuItemRepository.items).toHaveLength(1)
    expect(menuItemRepository.callsCount).toBe(1)
    expect(menuItemRepository.items[0].menuId()).toEqual('menu_id')
  })
})
