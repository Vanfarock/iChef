import Entity from '@shared/domain/entities/entity'

type MenuSectionProps = {
  menuId: string
}

export default class MenuSection extends Entity<MenuSectionProps> {
  private constructor(props: MenuSectionProps, id?: string) {
    super(props, id)
  }

  static create(props: MenuSectionProps, id?: string) {
    const menuSection = new MenuSection(props, id)

    return menuSection
  }
}
