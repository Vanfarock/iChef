export interface Match<T, U> {
  some: (val: T) => U
  none: () => U
}

export interface Option<T> {
  isSome(): boolean
  isNone(): boolean
  match<U>(fn: Match<T, U>): U
  unwrapOr(other: T): T
  unwrap(): T | never
}

export class OptionSome<T> implements Option<T> {
  constructor(readonly val: T) {}

  isSome(): boolean {
    return true
  }

  isNone(): boolean {
    return false
  }

  match<U>(fn: Match<T, U>): U {
    return fn.some(this.val)
  }

  unwrapOr(other: T): T {
    return this.val
  }

  unwrap() {
    return this.val
  }
}

export function Some<T>(val: T): Option<T> {
  return new OptionSome<T>(val)
}

export class OptionNone<T> implements Option<T> {
  isSome(): boolean {
    return false
  }

  isNone(): boolean {
    return true
  }

  match<U>(fn: Match<T, U>): U {
    return fn.none()
  }

  unwrapOr(other: T): T {
    return other
  }

  unwrap(): never {
    throw new ReferenceError('Trying to unwrap None.')
  }
}

export function None<T>(): Option<T> {
  return new OptionNone<T>()
}
