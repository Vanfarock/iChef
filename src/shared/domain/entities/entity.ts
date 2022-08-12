export default class Entity<T> {
  protected id: string
  protected props: T

  constructor(props: T, id?: string) {
    this.props = props
    this.id = id ?? ''
  }
}
