import MenuItem from '@entities/restaurant/menuItem'
import MenuItemRepository from 'src/application/repositories/restaurant/menu-item-repository'
import MenuSectionRepository from 'src/application/repositories/restaurant/menu-section-repository'
import AddItem from './add-item'

class MenuItemRepositorySpy implements MenuItemRepository {
  items: MenuItem[] = []
  callsCount = 0

  async add(item: MenuItem): Promise<void> {
    this.items.push(item)
    this.callsCount += 1
  }
}

class MenuSectionRepositorySpy implements MenuSectionRepository {
  items: MenuItem[] = []
  getMenuCallsCount = 0
  addCallsCount = 0

  async getMenu(menuSectionId: string): Promise<string> {
    this.getMenuCallsCount += 1

    return 'menu_id'
  }

  async add(item: MenuItem): Promise<void> {
    this.items.push(item)
    this.addCallsCount += 1
  }
}

type SutOutput = {
  sut: AddItem,
  menuItemRepository: MenuItemRepositorySpy,
  menuSectionRepository: MenuSectionRepositorySpy,
}

const makeSut = (): SutOutput => {
  const menuItemRepository = new MenuItemRepositorySpy()
  const menuSectionRepository = new MenuSectionRepositorySpy()
  const sut = new AddItem(menuItemRepository, menuSectionRepository)

  return {
    sut,
    menuItemRepository,
    menuSectionRepository,
  }
}

describe('AddItem', () => {
  it('should add new item to menu', async () => {
    const { sut, menuItemRepository, menuSectionRepository } = makeSut()

    const result = await sut.execute({ menuId: 'menu_id' })

    expect(result.isRight()).toBeTruthy()
    expect(menuItemRepository.items).toHaveLength(1)
    expect(menuItemRepository.callsCount).toBe(1)
    expect(menuItemRepository.items[0].menuId()).toEqual('menu_id')
    expect(menuSectionRepository.items).toHaveLength(0)
    expect(menuSectionRepository.addCallsCount).toBe(0)
    expect(menuSectionRepository.getMenuCallsCount).toBe(0)
  })

  it('should add new item to menu in specific section', async () => {
    const { sut, menuItemRepository, menuSectionRepository } = makeSut()

    const result = await sut.execute({ menuId: 'menu_id', menuSectionId: 'menu_section_id' })

    expect(result.isRight()).toBeTruthy()
    expect(menuItemRepository.items).toHaveLength(1)
    expect(menuItemRepository.callsCount).toBe(1)
    expect(menuItemRepository.items[0].menuId()).toEqual('menu_id')
    expect(menuSectionRepository.items).toHaveLength(1)
    expect(menuSectionRepository.addCallsCount).toBe(1)
    expect(menuSectionRepository.getMenuCallsCount).toBe(1)
  })

  it('should return an error when menu section is from a different menu', async () => {
    const { sut, menuItemRepository, menuSectionRepository } = makeSut()

    const result = await sut.execute({ menuId: 'wrong_menu_id', menuSectionId: 'menu_section_id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.left().unwrap().message).toEqual('Menu section is from a different menu.')
    expect(menuItemRepository.items).toHaveLength(0)
    expect(menuItemRepository.callsCount).toBe(0)
    expect(menuSectionRepository.items).toHaveLength(0)
    expect(menuSectionRepository.addCallsCount).toBe(0)
    expect(menuSectionRepository.getMenuCallsCount).toBe(1)
  })
})
