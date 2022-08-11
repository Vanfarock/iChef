export interface Match<T, U> {
  some: (val: T) => U
  none: (() => U) | U
}

export interface Option<T> {
  isSome() : boolean
  isNone(): boolean
  match<U>(fn: Match<T, U>): U
  unwrapOr(other: T): T
  unwrap(): T | never
}

export interface OptionSome<T> {
  unwrap(): T
}

export interface OptionNone<T> {
  unwrap(): never
}
