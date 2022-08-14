import Entity from '@shared/domain/entities/entity'

type MenuItemProps = {
  restaurantId: string
  menuSectionId?: string,
  name: string,
  description: string,
  value: number,
}

export default class MenuItem extends Entity<MenuItemProps> {
  private constructor(props: MenuItemProps, id?: string) {
    super(props, id)
  }

  static create(props: MenuItemProps, id?: string) {
    const menuItem = new MenuItem(props, id)

    return menuItem
  }

  public restaurantId(): string {
    return this.props.restaurantId
  }

  public value(): number {
    return this.props.value
  }
}
