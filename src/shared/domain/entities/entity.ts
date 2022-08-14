/* eslint-disable no-underscore-dangle */
export default class Entity<T> {
  protected _id: string
  protected props: T

  constructor(props: T, id?: string) {
    this.props = props
    this._id = id ?? ''
  }

  public id(): string {
    return this._id
  }
}
