import Entity from 'src/shared/domain/entities/entity'

type MenuProps = {
  restaurantId: string
}

export default class Menu extends Entity<MenuProps> {
  private constructor(props: MenuProps, id?: string) {
    super(props, id)
  }

  static create(props: MenuProps, id?: string) {
    const menu = new Menu(props, id)

    return menu
  }
}
