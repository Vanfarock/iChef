import Entity from '@shared/domain/entities/entity'

type RestaurantProps = {
  name: string
  description: string
  rating: number
}

export default class Restaurant extends Entity<RestaurantProps> {
  private constructor(props: RestaurantProps, id?: string) {
    super(props, id)
  }

  static create(props: RestaurantProps, id?: string) {
    const restaurant = new Restaurant(props, id)

    return restaurant
  }
}
