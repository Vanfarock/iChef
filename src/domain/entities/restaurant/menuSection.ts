import Entity from '@shared/domain/entities/entity'

type MenuSectionProps = {
  restaurantId: string,
  name: string,
  order: number,
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
