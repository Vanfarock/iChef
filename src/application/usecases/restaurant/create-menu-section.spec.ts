import MenuSectionRepositorySpy from '@tests/repositories/restaurant/menu-section-repository-spy'
import CreateMenuSection from './create-menu-section'

type SutOutput = {
  sut: CreateMenuSection,
  menuSectionRepository: MenuSectionRepositorySpy,
}

const makeSut = (): SutOutput => {
  const menuSectionRepository = new MenuSectionRepositorySpy()
  const sut = new CreateMenuSection(menuSectionRepository)

  return { sut, menuSectionRepository }
}

describe('CreateMenuSection', () => {
  it('should create a menu section', async () => {
    const { sut, menuSectionRepository } = makeSut()

    const result = await sut.execute({
      menuId: 'menu_id',
      name: 'menu_section',
      order: 0,
    })

    expect(result.isRight()).toBeTruthy()
    expect(menuSectionRepository.createCallsCount).toBe(1)
  })
})
