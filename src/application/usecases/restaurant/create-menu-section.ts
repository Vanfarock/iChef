import MenuSection from '@entities/restaurant/menuSection'
import { Either, right } from '@functional/either'
import MenuSectionRepository from '@repositories/restaurant/menu-section-repository'

export class CreateMenuSectionError implements Error {
  name: string
  message: string
  stack?: string

  constructor(message: string, stack?: string) {
    this.name = 'CreateSectionError'
    this.message = message
    this.stack = stack
  }
}

type CreateSectionRequest = {
  restaurantId: string,
  name: string,
  order: number,
}

export default class CreateMenuSection {
  constructor(readonly menuSectionRepository: MenuSectionRepository) { }

  async execute(request: CreateSectionRequest): Promise<Either<CreateMenuSectionError, void>> {
    const { restaurantId, name, order } = request
    const section = MenuSection.create({
      restaurantId,
      name,
      order,
    })

    await this.menuSectionRepository.create(section)

    return right(undefined)
  }
}
