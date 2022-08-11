import Entity from 'src/shared/domain/entities/entity'

type CustomerProps = {
  name: string
  description: string
  rating: number
}

export default class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: string) {
    super(props, id)
  }

  static create(props: CustomerProps, id?: string) {
    const customer = new Customer(props, id)

    return customer
  }
}
