import Entity from '@shared/domain/entities/entity'

type MenuItemProps = {
  menuId: string
  menuSectionId?: string
}

export default class MenuItem extends Entity<MenuItemProps> {
  private constructor(props: MenuItemProps, id?: string) {
    super(props, id)
  }

  static create(props: MenuItemProps, id?: string) {
    const menuItem = new MenuItem(props, id)

    return menuItem
  }
}
